---
title: AutoHotKey macros on Windows
---

I like automation. It saves time, simplify things and you can brag about how your setup does coffee for you. On Windows, AutoHotKey is the best tool for creating personal scripts and macros.

You can also create GUI scripts, but this posts will teach you only basics of automating things with AHK.

## Installation

Download the latest version from [official website](https://www.autohotkey.com/). Select UTF-8 encoding during installation if you use non English characters.

Installation directory should look like this:

```
- AHK
  - compiler
    - Ahk2Exe.exe
    - ...
  - AutoHotKey.exe
  - ...
```

With `Ahk2Exe.exe` you can make static binary of your script, and use it without whole installation. `AutoHotKey.exe` is the interpreter --- you will open your scripts with it.

To check if your installation is working, make `test.ahk` file with following content:

```
^j::
  Send, Hello world!
return
```

Run it, click on any text field and press `CTRL + J`. If it wrote "Hello world!" it is working.

## Syntax

Some examples:

```
;replaces "btw" with "by the way" in text field
::btw::by the way
```

```
!k::
  ;opens website in default browser
  Run, https://www.google.com/
return
```

```
F2::
Loop, 10
{
  Send, Ten lines of this after pressing F2 {Enter}
}
```

```
BlockInput On
  ;some precise operations
  ;will ignore keyboard input
BlockInput Off
```

```
vk25:: ; or "vk_left"
  MsgBox You pressed left arrow.
return
```

After running a script, there will be AHK logo in system tray. Right click on it and press "Open". Here you can debug your script. `CTRL + K` will bring up key presses history. You can take number of a key to use it as virtual key (e.g `vk25`).

You can check the [docs](https://www.autohotkey.com/docs/Hotstrings.htm) for further reading.

