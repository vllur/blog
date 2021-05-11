---
title: Installing Linux on Dell G3 3579
---

This laptop has NVIDIA GTX 1050 mobile graphics card, and it is an optimus laptop. Meaning, it has 2 cards --- integral and dedicated one --- and it should switch between them. Running Intel to save power and switching to NVIDIA for more demanding tasks.

This post covers directions for Manjaro KDE, but now I do not recommend it. Here are reasons [why](https://web.archive.org/web/20200814141338/https://manjaro.ykkz.de/en/). You can still follow if you installed another distro. Look up the packages names or your hardware manager.

## Installation process

As usual. Remember to choose proprietary drivers. Nouveau is glitchy on desktop, and I have not tried it on GPU demanding applications. Performance wise, on NVIDIA you should always pick proprietary drivers.

After installation, go to System Settings, and to Hardware Configuration. Here you can determine whether you are running prime or bumblebee. The first is more performant, but for this machine the HDMI port won't work. And it keeps the card running, draining battery even if you do not use it. The second option is more frugal and HDMI works, but does not use the card to its full potential.

But here is a thing --- due to a bug in either driver or kernel, card can't be powered on if it was powered off. Bumblebee turns the card off on system startup to save power. So you lose one pros of using it, because you need to alter that behavior and keep it always running.

## If you picked prime

You can install it by right clicking and selecting install. After reboot, you can launch applications with dedicated graphics via `prime-run` command:

```sh
prime-run glxgears
```

## If you picked bumblebee

Install it. Follow the usage section in [bumblebee README](https://github.com/Bumblebee-Project/Bumblebee).

Next, locate the config file. Can be either `/etc/bumblebee/bumblebee.conf` or `/usr/local/etc/bumblebee/bumblebee.conf`. Navigate to this fragment:

```sh
TurnCardOffAtExit=@CONF_TURNOFFATEXIT@
```

And change it to:
```sh
TurnCardOffAtExit=false
```

Save the file and reboot. After that, you should be able to use `optirun` command:

```sh
optirun glxgears
```
