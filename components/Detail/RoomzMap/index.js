const RoomzMap = () => {
  const map =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31907.93559712251!2d103.75345225407072!3d1.4774254045540973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ff7f340df129abf%3A0xd61ae09f7b827ad9!2sOptimum%20Technology!5e0!3m2!1szh-CN!2smy!4v1711596167649!5m2!1szh-CN!2smy";

  return (
    <div className="map-container google-map-code global-box-shadow mb-7">
      <iframe
        src={map}
        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
      />
    </div>
  );
};

export default RoomzMap;
