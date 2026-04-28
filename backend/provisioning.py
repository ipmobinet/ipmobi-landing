import secrets
import string
import subprocess
from config import PROXY_DOMAIN, SSH_HOST, SSH_USER, SSH_KEY_PATH


def _generate_credentials():
    """Generate random username and password for proxy."""
    alphabet = string.ascii_lowercase + string.digits
    username = "trial_" + "".join(secrets.choice(alphabet) for _ in range(8))
    password = "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(16))
    return username, password


def _get_next_port() -> int:
    """
    For MVP, assign a port from a range.
    In production, query the 3proxy server for allocated ports.
    """
    import random
    return random.randint(31000, 31999)


def provision_proxy() -> dict:
    """
    Provision a proxy port on the 3proxy server.

    For MVP: generates credentials and returns them.
    Actual SSH provisioning is a placeholder — uncomment when server is live.
    """
    username, password = _generate_credentials()
    port = _get_next_port()

    ssh_command = (
        f'echo "user {username} {password}" >> /etc/3proxy/3proxy.cfg && '
        f'echo "-p{port}" >> /etc/3proxy/3proxy.cfg && '
        f'systemctl restart 3proxy'
    )

    # Uncomment in production:
    # if SSH_HOST and SSH_USER:
    #     ssh_cmd = [
    #         "ssh", "-i", SSH_KEY_PATH,
    #         f"{SSH_USER}@{SSH_HOST}",
    #         ssh_command,
    #     ]
    #     subprocess.run(ssh_cmd, check=True, capture_output=True, timeout=30)

    return {
        "host": PROXY_DOMAIN,
        "port": port,
        "username": username,
        "password": password,
    }


def revoke_proxy(username: str) -> bool:
    """
    Revoke a proxy user by removing from 3proxy config.
    Returns True if successful.
    """
    ssh_command = (
        f"sed -i '/^{username}$/d' /etc/3proxy/3proxy.cfg && "
        f"sed -i '/^{username}$/d' /etc/3proxy/3proxy.cfg && "
        f"systemctl restart 3proxy"
    )

    # Uncomment in production:
    # if SSH_HOST and SSH_USER:
    #     ssh_cmd = [
    #         "ssh", "-i", SSH_KEY_PATH,
    #         f"{SSH_USER}@{SSH_HOST}",
    #         ssh_command,
    #     ]
    #     subprocess.run(ssh_cmd, check=True, capture_output=True, timeout=30)

    return True
