const SpacifyMap = () => {
  const map =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2758.035019642621!2d101.57683615426765!3d3.0772833603694467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4c572bf26213%3A0xcb46e7cb744867b5!2s42-46%2C%20Jalan%20SS%2019%2F1d%2C%20Ss%2019%2C%2047500%20Subang%20Jaya%2C%20Selangor!5e0!3m2!1sen!2smy!4v1728971837483!5m2!1sen!2smy";

  return (
    <div className="google-map-code global-box-shadow mb-7 h-screen min-h-screen sticky top-5">
      <iframe
        src={map}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          border: "none",
        }}
      />
    </div>
  );
};

export default SpacifyMap;
