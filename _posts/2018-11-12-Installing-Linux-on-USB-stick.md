---
title: Installing Linux on USB stick
---

Operating systems are mostly installed on hard drives. There is also a concept of Live CD, which allows you to run full operating system before installation. If you want to install programs on Live CD media, you can make a persistent storage, which will keep them. But you can also install the full system on such media, and here is how to do this.

## Preparations

You will need 2 USB sticks. First for Live CD and second as a target media. You can also use another media for Live CD if you want to. Next, burn ISO of your choice. You can use dd on Linux or [rufus](http://rufus.ie) on Windows.

The process can take up to 2 hours or more, depending on speed of the target drive.

## Installation

Plug the live media and boot from it. Then plug in the target drive and start the installation. While at partitioning, choose manual partitioning. Select your target device. You can make a small FAT partition if you want to still be able to use the drive as normal USB stick.

Make an EXT4 partition, set its mountpoint to `/`, and set boot flag on it. Check to install the GRUB bootloader to this device. Then proceed with the installation.

After its done, turn off the machine and unplug the Live media. You can now use it by booting to it on any computer, freely install software, etc.
