import cv2

img = cv2.imread('assets/example.png', 0)
img = cv2.resize(img, (400, 400))
img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
cv2.imshow('Sample Image',img)
cv2.waitKey(0)
cv2.destroyAllWindows()