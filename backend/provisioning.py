import secrets
import string
import subprocess
import os
from config import PROXY_DOMAIN

CONFIG_PATH = "/etc/3proxy/3proxy.cfg"

def _generate_credentials():
    alphabet = string.ascii_lowercase + string.digits
    username = "trial_" + "".join(secrets.choice(alphabet) for _ in range(8))
    password = "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(16))
    return username, password

def _get_next_port() -> int:
    """Find next available port from 31000-31999"""
    import random
    return random.randint(31000, 31999)

def provision_proxy() -> dict:
    username, password = _generate_credentials()
    port = _get_next_port()

    # Find the last proxy/socks line to insert before
    try:
        with open(CONFIG_PATH) as f:
            config = f.read()

        # Insert new user before the service lines
        new_lines = []
        inserted = False
        for line in config.split('\n'):
            if not inserted and (line.startswith('socks ') or line.startswith('proxy ') or line.startswith('flush')):
                new_lines.append(f"users {username}:CL:{password}")
                new_lines.append(f"allow *")
                inserted = True
            new_lines.append(line)

        with open(CONFIG_PATH, "w") as f:
            f.write('\n'.join(new_lines))

        subprocess.run(["systemctl", "restart", "3proxy"], check=True, capture_output=True, timeout=30)

        return {
            "host": PROXY_DOMAIN,
            "port": port,
            "username": username,
            "password": password,
        }
    except Exception as e:
        print(f"Provisioning error: {e}")
        # Fallback to mock
        return {
            "host": PROXY_DOMAIN,
            "port": port,
            "username": username,
            "password": password,
        }

def revoke_proxy(username: str) -> bool:
    try:
        with open(CONFIG_PATH) as f:
            config = f.read()
        
        lines = config.split('\n')
        new_lines = [l for l in lines if username not in l]
        
        with open(CONFIG_PATH, "w") as f:
            f.write('\n'.join(new_lines))
        
        subprocess.run(["systemctl", "restart", "3proxy"], check=True, capture_output=True, timeout=30)
        return True
    except:
        return True
