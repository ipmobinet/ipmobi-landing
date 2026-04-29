"""
Telegram Webhook Handler — messages arrive instantly, no polling needed.
Mount this in the FastAPI backend.
"""
import json, urllib.request, os

BOT_TOKEN = "8797136142:AAHFAO84qxUVR7EiaN9QTewty1obuIToRoQ"
YOUR_CHAT_ID = "103555577"

async def handle_telegram_webhook(data: dict):
    """Called when someone messages the bot. Telegram sends the message here instantly."""
    msg = data.get("message", {})
    chat_id = str(msg.get("chat", {}).get("id", ""))
    text = msg.get("text", "")
    from_name = msg.get("from", {}).get("first_name", "Someone")
    
    # Skip your own messages
    if chat_id == YOUR_CHAT_ID:
        return {"ok": True}
    
    # Check if this is YOUR reply to a customer
    if chat_id == YOUR_CHAT_ID:
        # You replied. Check if it's to a specific web visitor
        if text.startswith("/reply "):
            parts = text.split(" ", 2)
            if len(parts) >= 3:
                target_chat = parts[1]
                reply_text = parts[2]
                # Save the reply for the widget to pick up
                import json, os
                reply_file = f"/tmp/chat_replies_{target_chat}.json"
                msgs = []
                if os.path.exists(reply_file):
                    with open(reply_file) as f:
                        msgs = json.load(f)
                msgs.append({"text": reply_text, "from": "them", "time": str(__import__('datetime').datetime.now())})
                with open(reply_file, "w") as f:
                    json.dump(msgs, f)
                send_telegram(YOUR_CHAT_ID, f"✅ Reply sent to {target_chat}")
                return {"ok": True}
    
    # Forward to you
    forward = f"📩 <b>New Message</b>\nFrom: {from_name}\nChat: {chat_id}\n\n{text}"
    send_telegram(YOUR_CHAT_ID, forward, "HTML")
    
    # Auto-reply to customer
    reply = "Thanks for reaching out! 🙌\n\nI'll connect you with our team shortly. For urgent orders:\n📧 support@ipmobi.net\n🛒 https://ipmobi.net/order"
    send_telegram(chat_id, reply)
    
    print(f"📨 Telegram: {from_name} → forwarded to you")
    return {"ok": True}

def send_telegram(chat_id: str, text: str, parse_mode: str = None):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = {"chat_id": chat_id, "text": text}
    if parse_mode:
        data["parse_mode"] = parse_mode
    req = urllib.request.Request(url, data=json.dumps(data).encode(), headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req, timeout=10)
    except:
        pass

def set_webhook(url: str):
    """Set the Telegram webhook to point to our backend."""
    webhook_url = f"https://api.telegram.org/bot{BOT_TOKEN}/setWebhook?url={url}"
    resp = urllib.request.urlopen(urllib.request.Request(webhook_url), timeout=10)
    result = json.loads(resp.read())
    if result.get("ok"):
        print(f"✅ Webhook set to: {url}")
    else:
        print(f"❌ Webhook failed: {result}")
    return result

def delete_webhook():
    """Remove webhook (fallback to polling)."""
    urllib.request.urlopen(urllib.request.Request(f"https://api.telegram.org/bot{BOT_TOKEN}/deleteWebhook"), timeout=10)
    print("✅ Webhook deleted")
