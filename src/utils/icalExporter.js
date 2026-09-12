// iCal (.ics) file generator for exporting travel itineraries to Apple Calendar, Google Calendar, and Outlook

export function generateICS(itinerary, tripInput) {
  if (!itinerary || !itinerary.days) return '';

  const formatDate = (dateStr, timeStr = '09:00') => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const [hours, minutes] = timeStr.split(':').map(Number);
      const d = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    } catch {
      return new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
  };

  const escapeText = (str) => {
    if (!str) return '';
    return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  };

  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const events = [];

  // Add flight events if present
  if (itinerary.flight) {
    const depTime = itinerary.flight.departureTime || '08:00';
    const arrTime = itinerary.flight.arrivalTime || '14:00';
    events.push([
      'BEGIN:VEVENT',
      `UID:flight-dep-${Date.now()}@wandergraph.ai`,
      `DTSTAMP:${now}`,
      `DTSTART:${formatDate(tripInput.startDate, depTime)}`,
      `DTEND:${formatDate(tripInput.startDate, arrTime)}`,
      `SUMMARY:${escapeText(`Flight to ${tripInput.destination} (${itinerary.flight.airline || 'Flight'})`)}`,
      `DESCRIPTION:${escapeText(`Flight Details: ${itinerary.flight.airline} - ${itinerary.flight.flightNumber || 'Direct'}\\nFrom: ${tripInput.origin} To: ${tripInput.destination}\\nPrice: $${itinerary.flight.price}`)}`,
      `LOCATION:${escapeText(tripInput.origin + ' Airport')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    ].join('\r\n'));
  }

  // Add accommodation check-in event
  if (itinerary.accommodation) {
    events.push([
      'BEGIN:VEVENT',
      `UID:stay-${Date.now()}@wandergraph.ai`,
      `DTSTAMP:${now}`,
      `DTSTART:${formatDate(tripInput.startDate, '15:00')}`,
      `DTEND:${formatDate(tripInput.endDate, '11:00')}`,
      `SUMMARY:${escapeText(`Stay at ${itinerary.accommodation.name}`)}`,
      `DESCRIPTION:${escapeText(`Hotel: ${itinerary.accommodation.name}\\nRating: ${itinerary.accommodation.rating}★\\nAddress: ${itinerary.accommodation.location}\\nAmenities: ${(itinerary.accommodation.amenities || []).join(', ')}`)}`,
      `LOCATION:${escapeText(itinerary.accommodation.location || tripInput.destination)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    ].join('\r\n'));
  }

  // Add daily activities
  itinerary.days.forEach((day, dIdx) => {
    const dayDate = day.date || tripInput.startDate;
    
    if (day.activities && day.activities.length > 0) {
      day.activities.forEach((act, aIdx) => {
        let startTime = '10:00';
        let endTime = '12:00';
        if (act.timeOfDay === 'afternoon') { startTime = '14:00'; endTime = '16:30'; }
        if (act.timeOfDay === 'evening') { startTime = '18:00'; endTime = '20:30'; }
        if (act.timeOfDay === 'morning') { startTime = '09:30'; endTime = '12:00'; }

        events.push([
          'BEGIN:VEVENT',
          `UID:act-d${dIdx}-a${aIdx}-${Date.now()}@wandergraph.ai`,
          `DTSTAMP:${now}`,
          `DTSTART:${formatDate(dayDate, startTime)}`,
          `DTEND:${formatDate(dayDate, endTime)}`,
          `SUMMARY:${escapeText(act.title)}`,
          `DESCRIPTION:${escapeText(`${act.description || ''}\\nCost: $${act.cost || 0}\\nCategory: ${act.category || 'Sightseeing'}\\nTips: ${act.tips || 'Enjoy!'}`)}`,
          `LOCATION:${escapeText(act.location || tripInput.destination)}`,
          'STATUS:CONFIRMED',
          'END:VEVENT'
        ].join('\r\n'));
      });
    }

    if (day.dining) {
      ['lunch', 'dinner'].forEach((mealType) => {
        const meal = day.dining[mealType];
        if (meal) {
          const startTime = mealType === 'lunch' ? '12:30' : '19:30';
          const endTime = mealType === 'lunch' ? '14:00' : '21:30';
          events.push([
            'BEGIN:VEVENT',
            `UID:meal-d${dIdx}-${mealType}-${Date.now()}@wandergraph.ai`,
            `DTSTAMP:${now}`,
            `DTSTART:${formatDate(dayDate, startTime)}`,
            `DTEND:${formatDate(dayDate, endTime)}`,
            `SUMMARY:${escapeText(`${mealType.toUpperCase()}: ${meal.name}`)}`,
            `DESCRIPTION:${escapeText(`Cuisine: ${meal.cuisine}\\nPrice: $${meal.cost}\\nSpecialty: ${meal.specialty || ''}`)}`,
            `LOCATION:${escapeText(meal.location || tripInput.destination)}`,
            'STATUS:CONFIRMED',
            'END:VEVENT'
          ].join('\r\n'));
        }
      });
    }
  });

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WanderGraph AI//Multi-Agent Travel Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${tripInput.destination} Trip - WanderGraph`,
    'X-WR-TIMEZONE:UTC',
    events.join('\r\n'),
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

export function downloadICSFile(filename, icsContent) {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
