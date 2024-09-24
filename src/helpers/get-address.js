export async function getAddress(ipAddress) {
  const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_ODUk4UHE3ru9QIQvqy2lKuA7N3XJl&ipAddress=${ipAddress}`)

  return await response.json();
}