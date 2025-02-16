---
title: "Living guide for novice PineTime tinkerers"
date: 2025-02-16
updated: 2025-02-16
categories:
  - Tinkering
description: Learn how to edit the InfiniTime firmware and flash it to the PineTime using the NRFConnect app for iOS and Android. Perfect for beginners interested in tinkering with their PineTime.
published: true
ToC: true
---

My [PineTime](https://pine64eu.com/product/pinetime-smartwatch-sealed/) arrived on the 14th of February, 2025. The PineTime is a light-weight smartwatch equipped with a photoplethysmography (PPG) sensor and an accelerometer. It's cheap, does not sell your data, and it's fully open-source. Owners can modify its hardware and software at will. This post will outline procedures, links, tips and snippets for tinkering with InfiniTime (PineTime's default [firmware](https://en.wikipedia.org/wiki/Firmware)).

![The PineTime on-wrist](posts/pinetime/pinetime_on_wrist.jpeg)

## Editing the firmware
Explains how we can start editing InfiniTime. 

1. Fork the [InfiniTime repository](https://github.com/InfiniTimeOrg/InfiniTime). This will create a copy of the repository in our own Github account. 
2. Go to the new fork, mine lives at https://github.com/koenraijer/InfiniTime, yours will live at `https://github.com/[USERNAME]/InfiniTime`.
3. Edit a file in the repository and commit your changes. For example, to change the stopwatch app, go to [`InfiniTime/src/displayapp/screens/StopWatch.cpp`](https://github.com/koenraijer/InfiniTime/blob/main/src/displayapp/screens/StopWatch.cpp). 
4. Every time we commit a change to our fork, the source code is automatically converted by a GitHub Action ([my fork's version](https://github.com/koenraijer/InfiniTime/blob/main/.github/workflows/main.yml)). 

Github also tracks updates we make to our fork, and also allows us to **pull** updates from the original PineTime repository and apply them to our fork. 

This allows us to: 
- Submit a pull request if we've made a useful update. If our pull request is accepted, our changes become part of the official project. This is how open source projects are maintained and improved. 
- Update our local version with the official project so we don't miss out on other people's contributions. 
## Flashing our custom firmware
This explains how to apply edits made to our InfiniTime fork and update our PineTime with them. The process of reprogramming firmware is known as **flashing**. It involves the writing of new firmware onto the device's internal memory. Flashing is perfectly possible with a **sealed** PineTime. We'll be using the NRFConnect app to flash our custom firmware to the PineTime over BlueTooth. 

1. On our phone, download the NRFConnect app ([App Store](https://apps.apple.com/gb/app/nrf-connect-for-mobile/id1054362403), [Google Play](https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp&hl=en&gl=US)). 
2. Now we need one of the files built by the action that ran after we committed our change. We can follow the next steps on our phone or on our computer, but we must have access to the downloaded file on our phone.
3. In our fork, go to the *Actions* tab. We should see something like this: 

![](posts/pinetime/actions1.png)

1. This means that the `CI` action ran successfully (this is the action linked to previously). Let's click on the run. 

![](posts/pinetime/actions2.png)

2. At the bottom of the screen, we'll see a list of **artifacts**. These are the files created by the action. We need the `InfiniTime DFU main` file. Let's click on the download icon to the right. The file should be called `InfiniTime DFU main.zip`. 

![](posts/pinetime/artifacts.png)

3. On our phone, open the NRFConnect app. In the *Scanner* tab, look for "InfiniTime". Click on *Connect*. If it's not there, make sure the PineTime is not connected to a companion app. 

![|300](posts/pinetime/nrfconnect1.jpeg)

4. Now click on *Open Document Picker* and select the `InfiniTime DFU main.zip` file on our phone. 

![|300](posts/pinetime/nrfconnect2.jpeg)

5. Let's scroll down until a *Start* button appears and click on it. 

![|300](posts/pinetime/nrfconnect3.jpeg)

6. The file will now be uploaded to your PineTime over BlueTooth, as indicated by the progress indicator on the app.

![|300](posts/pinetime/nrfconnect4.jpeg)

7. The PineTime will now show that it's updating.

![|300](posts/pinetime/firmware_update.jpeg)

## Links and resources
- [Manufacturer's Wiki page](https://wiki.pine64.org/index.php/PineTime) 
- [Article: Build PineTime Firmware in the Cloud with GitHub Actions (dated, still useful)](https://lupyuen.github.io/pinetime-rust-mynewt/articles/cloud)
- [Article: Creating a stopwatch in Pinetime](https://blog.pankajraghav.com/2021/04/03/PINETIME-STOPCLOCK.html)