import time
import pyautogui

pyautogui.hotkey("alt", "tab")
time.sleep(2.5)
pyautogui.press("space")

gray_col = (172, 172, 172)

while True:
  
  if(pyautogui.pixelMatchesColor(510, 273, gray_col) or 
    pyautogui.pixelMatchesColor(512, 275, gray_col) or
    pyautogui.pixelMatchesColor(512, 255, gray_col) or
    pyautogui.pixelMatchesColor(506, 273, gray_col)):
    
    pyautogui.press("space", interval = 0.1)
    pyautogui.press("down", interval = 0.1)


