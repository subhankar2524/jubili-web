# Map Integration Guide

This document explains how to integrate real map services into the payment page for location selection.

## Current Implementation

The payment page currently uses a placeholder map component (`MapSelector.tsx`) that simulates location selection. This can be easily replaced with real map services.

## Recommended Map Services

### 1. Google Maps API (Recommended)

**Installation:**
```bash
npm install @googlemaps/js-api-loader
```

**Usage in MapSelector.tsx:**
```typescript
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
});

// Initialize map
loader.load().then(() => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 13,
  });
  
  // Add click listener
  map.addListener('click', (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    // Reverse geocoding to get address
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        onLocationSelect({
          lat,
          lng,
          address: results[0].formatted_address
        });
      }
    });
  });
});
```

### 2. Mapbox

**Installation:**
```bash
npm install mapbox-gl
```

**Usage:**
```typescript
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.0060, 40.7128],
  zoom: 13
});

// Add click listener
map.on('click', (e) => {
  const { lng, lat } = e.lngLat;
  
  // Reverse geocoding
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
    .then(response => response.json())
    .then(data => {
      if (data.features[0]) {
        onLocationSelect({
          lat,
          lng,
          address: data.features[0].place_name
        });
      }
    });
});
```

### 3. OpenStreetMap with Leaflet

**Installation:**
```bash
npm install leaflet react-leaflet
```

**Usage:**
```typescript
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

function LocationMarker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      
      // Use Nominatim for reverse geocoding
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(response => response.json())
        .then(data => {
          onLocationSelect({
            lat,
            lng,
            address: data.display_name
          });
        });
    },
  });
  
  return null;
}

// In your component
<MapContainer center={[40.7128, -74.0060]} zoom={13}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <LocationMarker onLocationSelect={onLocationSelect} />
</MapContainer>
```

## Environment Variables

Add these to your `.env.local` file:

```env
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## Features to Implement

1. **Search Autocomplete**: Add address search with autocomplete suggestions
2. **Current Location**: Use browser geolocation to get user's current location
3. **Address Validation**: Validate addresses before allowing form submission
4. **Multiple Addresses**: Allow users to save multiple addresses
5. **Delivery Zones**: Show delivery availability based on location

## Security Considerations

1. **API Key Restrictions**: Restrict API keys to your domain
2. **Rate Limiting**: Implement rate limiting for geocoding requests
3. **Error Handling**: Handle API failures gracefully
4. **Privacy**: Ensure user location data is handled according to privacy laws

## Cost Considerations

- **Google Maps**: $5 per 1000 requests after free tier
- **Mapbox**: 50,000 free requests per month
- **OpenStreetMap**: Free but requires attribution

## Implementation Steps

1. Choose a map service based on your requirements
2. Install the necessary packages
3. Replace the placeholder map in `MapSelector.tsx`
4. Add environment variables
5. Test the integration
6. Add error handling and loading states
7. Optimize for performance 