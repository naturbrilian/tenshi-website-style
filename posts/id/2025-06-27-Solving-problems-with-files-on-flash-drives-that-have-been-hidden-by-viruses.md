---
title: Mengatasi masalah file di flashdisk yang ke hidden karena virus
published: 2025-06-27
category: 'tutorial'
lang: id
---

![image](assets/hidden-fd.png)

> [!NOTE]
> Sebenarnya ini artikel adalah salinan dari postingan yang aku buat di fb kemarin

Aku kan kemarin sempat tiba-tiba buat postingan di Facebook, karena sebuah postingan di salah satu grup yang tiba-tiba flashdisknya saat dicolokin ke laptopnya ternyata kena hidden, lalu warga grup tersebut berkomentar “disinilah peran Smadav diperlukan”.

Nah, sedangkan Smadav sendiri itu ternyata menggunakan metode yang sama aku gunakan 5 tahun yang lalu, tepatnya setelah aku menancapkan flashdisk ku pc milik kantor tempat aku bekerja. Waktu itu karena mau mengunggah berkas video ke YouTube yang terpaksa pakai laptopku gara-gara PC kantor tidak terpasang driver wifi/jaringannya.

## Cara mengatasinya
Nah, buat yang masih mengandalkan smadav, sebenarnya bisa menggunakan perintah ini di Command Prompt, cukup ketikkan command dibawah lalu tekan enter, jangan lupa untuk mengganti direktori tujuan ke flashdiskmu.

```command
"attrib -s -r -h *.* /s /d /l"
```
## CATATAN TAMBAHAN
Perintah ini hanya berlaku untuk flashdisk, tidak berlaku untuk harddisk eksternal

Sebenarnya cara ini sudah lama digunakan, apalagi kamu yang sering ke tukang percetakan dan warnet apalagi. Soal Smadav sendiri ternyata mereka sudah mengimplementasikan ini, tapi hanya saja dalam bentuk GUI (Graphical User Interface) atau kita biasa menyebutnya dengan Antarmuka Pengguna Grafis agar pengguna yang masih awam mudah menggunakannya.

Berdasarkan komentar dari warga threads, flashdisk ini sudah terinfeksi virus & ini sebenarnya sudah lama terjadi.

![comment](assets/comment.png)