import cv2
import numpy as np

cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    image = np.zeros(frame.shape, np.uint8) 
    cv2.imshow('frame', image) # change to frame for reading
    if cv2.waitKey(1) == ord('x'):
        break
cap.release()
cv2.destroyAllWindows()