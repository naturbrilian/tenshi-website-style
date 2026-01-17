---
title: Solving problems with files on flash drives that have been hidden by viruses
published: 2025-06-27
category: 'tutorial'
lang: en
---

> [!NOTE]
> Actually, this article is a copy of a post I made on Facebook yesterday

Yesterday, I suddenly made a post on Facebook because a post in one of the groups suddenly mentioned that a flash drive was hidden when plugged into a laptop, and then the group members commented, “This is where Smadav comes in.”

Well, Smadav itself turns out to use the same method I used 5 years ago, precisely after I plugged my flash drive into the PC at the office where I work. At that time, I wanted to upload a video file to YouTube, so I had to use my laptop because the office PC didn't have a WiFi/network driver installed.

## How to fix the problems
Well, for those who still rely on Smadav, you can actually use this command in Command Prompt. Just type the command below and press enter. Don't forget to change the destination directory to your flash drive.

```command
"attrib -s -r -h *.* /s /d /l"
```
## Additional Notes
This command only applies to flash drives, not external hard drives.

Actually, this method has been used for a long time, especially if you often go to print shops and internet cafes. As for Smadav itself, it turns out that they have already implemented this, but only in the form of a GUI (Graphical User Interface) or what we commonly refer to as a Graphical User Interface so that users who are still unfamiliar with it can easily use it.

Based on comments from residents on the threads, this flash drive has been infected with a virus, and this has actually been going on for a long time.

![comment](assets/comment.png)