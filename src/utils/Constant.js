const Constant = {
  PHONE_PREFIX: [
    { name: "Malaysia +60", value: "+60" },
    { name: "Singapore +65", value: "+65" },
    { name: "China +86", value: "+86" },
    { name: "HongKong +852", value: "+852" },
    { name: "Taiwan +886", value: "+886" },
  ],

  STATE_CODE: [
    { name: "Johor", value: "MY-01" },
    { name: "Kedah", value: "MY-02" },
    { name: "Kelantan", value: "MY-03" },
    { name: "Kuala Lumpur", value: "MY-14" },
    { name: "Melaka", value: "MY-04" },
    { name: "Negeri Sembilan", value: "MY-05" },
    { name: "Perak", value: "MY-08" },
    { name: "Perlis", value: "MY-09" },
    { name: "Pulau Pinang", value: "MY-07" },
    { name: "Pahang", value: "MY-06" },
    { name: "Sabah", value: "MY-12" },
    { name: "Sarawak", value: "MY-13" },
    { name: "Selangor", value: "MY-10" },
    { name: "Terengganu", value: "MY-11" },
    { name: "WP Labuan", value: "MY-15" },
  ],

  AGREEMENT_ALL: 0,
  AGREEMENT_DRAFT: 1,
  AGREEMENT_PENDING: 2,
  AGREEMENT_CONFIRM: 3,

  UNPAID: "UNPAID",
  PAID: "PAID",

  INVOICE_OVER_DUE: "2",
  INVOICE_COMING_SOON: "1",
  INVOICE_PAID: "3",

  TENANCY: "Tenancy",
  POLICY: "Policy",

  HOME_FOR_RENT: "whole-unit",
  ROOM_FOR_RENT: "sublet",

  MAINTENANCE_REQUESTS: "Maintenance Requests",
  GENERAL_ENQUIRIES: "General Enquiries Requests",

  ENQUIRY: "Enquiry",
  FEEDBACK: "Feedback",

  AMENITIES: "Amenities",
  ELECTRICAL: "Electrical",
  PLUMBING: "Plumbing",
  EXTERIOR_INTERIOR: "Exterior&Interior",
  CLEANING: "Cleaning",
};

export default Constant;
