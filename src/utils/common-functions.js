import React from "react";
import * as Icon from "react-feather";
//mportt { format } from "date-fns";

const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
});

export const abbreviateNumber = (number) => {
  if (Math.abs(number) < 1e3) return numberFormatter.format(number);
  else if (Math.abs(number) >= 1e3 && Math.abs(number) < 1e5)
    return numberFormatter.format(number / 1e3) + "K";
  else if (Math.abs(number) >= 1e5 && Math.abs(number) < 1e7)
    return numberFormatter.format(number / 1e5) + "L";
  else if (Math.abs(number) >= 1e7 && Math.abs(number) < 1e10)
    return numberFormatter.format(number / 1e7) + "Cr";
  else if (Math.abs(number) >= 1e10 && Math.abs(number) < 1e14)
    return numberFormatter.format(number / 1e10) + "K Cr";
  else if (Math.abs(number) >= 1e14)
    return numberFormatter.format(number / 1e14) + "L Cr";
};

export const formatDate = (unformattedDate) => {
  const day = unformattedDate.slice(0, 2);
  const month = unformattedDate.slice(3, 5);
  const year = unformattedDate.slice(6, 10);
  const time = unformattedDate.slice(11);

  return `${year}-${month}-${day}T${time}+05:30`;
};

export const formatDateAbsolute = (unformattedDate) => {
  if (!(unformattedDate || "")) return "";

  const splitDateTime = unformattedDate.split(" ");
  const dateMonthYear = splitDateTime[0].split("/");
  const date = dateMonthYear[0];
  const month = dateMonthYear[1];
  const time = splitDateTime[1];
  return `${date} ${months[Number(month)]}, ${time.slice(0, 5)} IST`;
};

export function commaSeperated(x) {
  if (x !== undefined) {
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  } else return 0;
}

export function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

export function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;

  if (secondsPast < 60) {
    return (
      parseInt(secondsPast) +
      ` second${parseInt(secondsPast) > 1 ? "s" : ""} ago`
    );
  }

  if (secondsPast < 3600) {
    return (
      parseInt(secondsPast / 60) +
      ` minute${parseInt(secondsPast / 60) > 1 ? "s" : ""} ago`
    );
  }

  if (secondsPast <= 86400) {
    return (
      parseInt(secondsPast / 3600) +
      ` hour${parseInt(secondsPast / 3600) > 1 ? "s" : ""} ago `
    );
  }
  if (secondsPast > 86400) {
    let day = timeStamp.getDate();
    var month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    var year =
      timeStamp.getFullYear() === now.getFullYear()
        ? ""
        : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}

export function DeltaArrow({ deltaType, color }) {
  return Number(deltaType) > 0 ? (
    <Icon.ArrowUp
      style={{ verticalAlign: -1 }}
      color={color}
      size={10}
      strokeWidth={3.5}
    />
  ) : Number(deltaType) < 0 ? (
    <Icon.ArrowDown
      style={{ verticalAlign: -1 }}
      color={color}
      size={10}
      strokeWidth={3.5}
    />
  ) : (
    ""
  );
}

export function DeltaValue({ deltaType, color }) {
  return Number(deltaType) > 0 ? (
    <span style={{ color: color }}>{commaSeperated(Number(deltaType))}</span>
  ) : Number(deltaType) < 0 ? (
    <span style={{ color: color }}>
      {commaSeperated(Math.abs(Number(deltaType)))}
    </span>
  ) : (
    ""
  );
}