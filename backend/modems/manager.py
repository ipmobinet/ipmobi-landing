"""
Modem Manager for IPMobi — handles 20+ USB 5G modems + 5G routers.

Detects connected USB modems via ModemManager (mmcli), tracks IPs,
generates 3proxy config dynamically, and provides IP rotation per-modem.
"""
import subprocess, re, time, json, os
from typing import Optional

MODEMS_DB = "/tmp/ipmobi-modems.json"
BASE_SOCKS_PORT = 10000
BASE_HTTP_PORT = 11000

class Modem:
    def __init__(self, modem_id, name, ip, port, http_port, carrier, interface, online):
        self.modem_id = modem_id
        self.name = name
        self.ip = ip
        self.port = port
        self.http_port = http_port
        self.carrier = carrier
        self.interface = interface
        self.online = online
    
    def to_dict(self):
        return {
            "modem_id": self.modem_id, "name": self.name, "ip": self.ip,
            "port": self.port, "http_port": self.http_port, "carrier": self.carrier,
            "interface": self.interface, "online": self.online
        }

def detect_modems():
    """Detect all connected USB 5G modems + ethernet 5G routers"""
    modems = []
    
    # Method 1: ModemManager (USB 5G modems)
    try:
        result = subprocess.run(["mmcli", "-L"], capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            for line in result.stdout.split('\n'):
                m = re.search(r'\[(\d+)\]\s+(.*)', line)
                if m:
                    modem_id = m.group(1)
                    name = m.group(2).strip()
                    details = subprocess.run(["mmcli", "-m", modem_id], capture_output=True, text=True, timeout=10)
                    ip, carrier, interface = "", "", ""
                    if details.returncode == 0:
                        ip_m = re.search(r'ip\s*:\s*([\d.]+)', details.stdout)
                        if ip_m: ip = ip_m.group(1)
                        carrier_m = re.search(r'operator\s*(?:name|id)?\s*:\s*(.+)', details.stdout)
                        if carrier_m: carrier = carrier_m.group(1).strip()
                    port = BASE_SOCKS_PORT + len(modems)
                    http_port = BASE_HTTP_PORT + len(modems)
                    modems.append(Modem(modem_id, name, ip, port, http_port, carrier, interface, bool(ip)))
    except: pass
    
    # Method 2: QMI/WWAN interfaces (Quectel modems)
    try:
        result = subprocess.run(["ip", "addr", "show"], capture_output=True, text=True, timeout=5)
        for line in result.stdout.split('\n'):
            if "wwan" in line or "qmi" in line:
                iface = line.split(':')[0].strip() if ':' in line else line.strip()
                ip_r = subprocess.run(["ip", "-4", "addr", "show", iface], capture_output=True, text=True, timeout=5)
                ip_m = re.search(r'inet\s+([\d.]+)', ip_r.stdout)
                if ip_m and not any(m.interface == iface for m in modems):
                    ip = ip_m.group(1)
                    port = BASE_SOCKS_PORT + len(modems)
                    http_port = BASE_HTTP_PORT + len(modems)
                    modems.append(Modem(f"qmi_{len(modems)}", f"QMI-{iface}", ip, port, http_port, "5G", iface, True))
    except: pass
    
    # Method 3: ethernet 5G routers (check for default gateway with high metric)
    try:
        result = subprocess.run(["ip", "route", "show", "default"], capture_output=True, text=True, timeout=5)
        for line in result.stdout.split('\n'):
            m = re.search(r'via\s+([\d.]+)\s+dev\s+(\w+)', line)
            if m:
                gw = m.group(1)
                iface = m.group(2)
                if iface not in ["lo", "docker0"] and not any(m.interface == iface for m in modems):
                    port = BASE_SOCKS_PORT + len(modems)
                    http_port = BASE_HTTP_PORT + len(modems)
                    modems.append(Modem(f"eth_{len(modems)}", f"ETH-{iface}", gw, port, http_port, "Router", iface, True))
    except: pass
    
    return modems

def generate_3proxy_config(modems):
    """Generate 3proxy config with all modems"""
    lines = [
        "nserver 1.1.1.1", "nserver 8.8.8.8",
        "nscache 65536", "timeouts 1 5 30 60 180 1800 15 60", "daemon",
    ]
    for i, m in enumerate(modems):
        lines.append(f"users modem_{i+1}:CL:pass_{i+1}_{int(time.time()%100000)}")
    lines.append("auth strong")
    lines.append("flush")
    lines.append("allow *")
    for i, m in enumerate(modems):
        if m.ip:
            lines.append(f"socks -p{m.port} -e{m.ip}")
            lines.append(f"proxy -p{m.http_port} -e{m.ip}")
        else:
            lines.append(f"socks -p{m.port}")
            lines.append(f"proxy -p{m.http_port}")
    return '\n'.join(lines)

def save_state(modems):
    with open(MODEMS_DB, "w") as f:
        json.dump([m.to_dict() for m in modems], f, indent=2)

def load_state():
    try:
        with open(MODEMS_DB) as f:
            return json.load(f)
    except:
        return []

def rotate_modem(modem_id):
    try:
        subprocess.run(["mmcli", "-m", modem_id, "--disable"], capture_output=True, timeout=15)
        time.sleep(3)
        subprocess.run(["mmcli", "-m", modem_id, "--enable"], capture_output=True, timeout=30)
        time.sleep(5)
        return True
    except:
        return False
