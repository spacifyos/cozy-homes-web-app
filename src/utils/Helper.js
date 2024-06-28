import { ceil, join, replace, reverse, split, toString } from "lodash";
import React from "react";
import CryptoJS from "crypto-js";

const isProduction = process.env.NODE_ENV === "production";

const secToMin = (seconds) => {
  let secs = Math.round(seconds);

  if (secs < 0) throw new Error("Seconds must be positive");

  if (secs < 60) {
    if (secs < 10) return `0:0${secs}`;

    return `0:${secs}`;
  }

  let minuteDivisor = secs % (60 * 60);
  let minutes = Math.floor(minuteDivisor / 60);

  let secondDivisor = minuteDivisor % 60;
  let remSecs = Math.ceil(secondDivisor);

  if (remSecs < 10 && remSecs > 0) remSecs = `0${remSecs}`;
  if (remSecs === 0) remSecs = `${remSecs}0`;

  let time = {
    m: minutes,
    s: remSecs,
  };

  return `${time.m}:${time.s}`;
};

const formatToDatePicker = (date) => {
  let month = date.getMonth() + 1;

  let day = date.getDate();

  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const generateSecretKey = (secret1, secret2) => {
  const secret = new Date().getHours();
  const key1 = replace(secret1, "8", "o");
  const key2 = replace(secret2, "8", "m");
  let final = "";

  if (secret % 2 == 0) {
    const reverseKey2 = join(reverse(split(key2, "")), "");
    final = toString(CryptoJS.MD5(key1 + reverseKey2));
  } else {
    const reverseKey1 = join(reverse(split(key1, "")), "");
    final = toString(CryptoJS.MD5(key2 + reverseKey1));
  }

  return final;
};

const documentGetElementById = (id) => {
  return typeof window !== "undefined" && document.getElementById(id);
};

export default {
  isProduction,
  secToMin,
  formatToDatePicker,
  generateSecretKey,
  documentGetElementById,
};
