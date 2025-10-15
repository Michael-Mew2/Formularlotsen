export default function LocationDialog({ location }) {
  return (
    <>
      <h2>{location.name}</h2>
      <p>Adresse: {location.address}</p>
      <p>Öffnungszeiten: {location.openingHours}</p>
      <p>Erreichbarkeit: {location.accessibility}</p>
    </>
  );
}
