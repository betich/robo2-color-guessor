import cv2
from color_processor.socket import sio

def detect_qr_code(img_path):
  qcd = cv2.QRCodeDetector()
  
  img = None
  
  try:
    img = cv2.imread(img_path)
  except:
    print('Image not found')
    return

  retval, decoded_info, points, straight_qrcode = qcd.detectAndDecodeMulti(img)

  return (retval, decoded_info)

def qr_code_camera():
  # 0 -> webcam
  # 1 -> built-in camera
  camera_id = 1
  # view all possible camera ids

  delay = 1
  window_name = 'OpenCV QR Code'

  qcd = cv2.QRCodeDetector()
  cap = cv2.VideoCapture(camera_id)

  while True:
      ret, frame = cap.read()

      if ret:
          ret_qr, decoded_info, points, _ = qcd.detectAndDecodeMulti(frame)
          if ret_qr:
                detected_values = []
                for s, p in zip(decoded_info, points):
                  if s:
                    color = (0, 255, 0)
                    detected_values.append(s)
                  else:
                    color = (0, 0, 255)
                  frame = cv2.polylines(frame, [p.astype(int)], True, color, 8)
                print(detected_values)
                sio.emit('color', {'data': detected_values})
          cv2.imshow(window_name, frame)

      if cv2.waitKey(delay) & 0xFF == ord('q'):
          break

  cv2.destroyWindow(window_name)