/**
 * Copyright 2020 - present, Alpstein Technology Sdn Bhd.
 * All rights reserved.
 */
import _ from "lodash";
import React from "react";
const isProduction = process.env.NODE_ENV === "production";

const arrayToString = (obj, separator = ",") =>
  Object.keys(obj)
    .map((key) => obj[key])
    .join(separator);

const trackPageView = (url) => {
  try {
    window.gtag("config", "UA-XXXXXXXX-X", {
      page_location: url,
    });
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
};

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

const dateToYMD = (date) => {
  let d = date.getDate();
  let m = date.getMonth() + 1; //Month from 0 to 11
  let y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
};

const formatToDatePicker = (date) => {
  let month = date.getMonth() + 1;

  let day = date.getDate();

  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const downPaymentCalculate = (propertyPrice, downPaymentRate) => {
  if (propertyPrice === 0 || downPaymentRate === 0) {
    return 0;
  }

  return _.ceil((propertyPrice * 100 * downPaymentRate) / 100 / 100, 2);
};

const openWhatsappLink = (number, text) => {
  const number1 = `60146160394`;
  const text1 = `Hello Leong,I am interest in you~~~~`;

  window.open(`https://wa.me/${number}/?text=${text}`, "_blank");
};

export default {
  isProduction,
  trackPageView,
  secToMin,
  arrayToString,
  dateToYMD,
  formatToDatePicker,
  downPaymentCalculate,
  openWhatsappLink,
};
