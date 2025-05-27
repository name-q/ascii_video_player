try:
    import cv2
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
    import cv2
import json
import os

ascii_chars = "willliamQianMcdonalds@%#*+=-:. "

def rgb_to_ansi(r, g, b):
    return f"\033[38;2;{r};{g};{b}m"

def pixel_to_char(brightness):
    idx = int((brightness / 255) * (len(ascii_chars) - 1))
    return ascii_chars[idx]

def frame_to_ascii(frame, width, height):
    frame = cv2.resize(frame, (width, height), interpolation=cv2.INTER_AREA)
    ascii_frame = ''
    for row in frame:
        line = ''
        for b, g, r in row:
            brightness = int(0.299 * r + 0.587 * g + 0.114 * b)
            char = pixel_to_char(brightness)
            color = rgb_to_ansi(r, g, b)
            line += f"{color}{char}\033[0m"
        ascii_frame += line + '\n'
    return ascii_frame

def video_to_ascii(filepath, width=80, height=40, output='output/ascii_video.json'):
    cap = cv2.VideoCapture(filepath)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frames = []

    print(f"[INFO] Processing {frame_count} frames...")

    for _ in range(frame_count):
        ret, frame = cap.read()
        if not ret:
            break
        ascii_frame = frame_to_ascii(frame, width, height)
        frames.append(ascii_frame)

    cap.release()

    os.makedirs(os.path.dirname(output), exist_ok=True)
    with open(output, 'w', encoding='utf-8') as f:
        json.dump({
            "width": width,
            "height": height,
            "fps": fps,
            "frames": frames
        }, f)

    print(f"[DONE] Saved to {output}")

if __name__ == '__main__':
    video_to_ascii('assets/video.mp4', width=80, height=40)
