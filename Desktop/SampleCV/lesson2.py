import cv2
import random

img = cv2.imread('assets/roblox.png', -1)
img = cv2.resize(img, (1000, 1000)) # Base on after highlights
img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)

# For Highlighting
tag = img[500:700, 600:900] #Before
img[100:300, 650:950] = tag #After

# for static color
for i in range(100):
   for j in range(img.shape[1]):
       img[i][j] = [random.randint(0, 255),
                    random.randint(0, 255),
                    random.randint(0, 255)]

cv2.imshow('Image', img)
cv2.waitKey(0)
cv2.destroyAllWindows()