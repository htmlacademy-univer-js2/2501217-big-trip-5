export function adaptToServer(point) {
  const adaptedPoint = {...point,
    'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
    'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
    'base_price': point.basePrice,
    'is_favorite': point.isFavorite,
  };

  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.basePrice;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
}

export function adaptToClient(point) {
  const adaptedPoint = {...point,
    dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : new Date(point['date_from']),
    dateTo: point['date_to'] !== null ? new Date(point['date_to']) : new Date(point['date_to']),
    basePrice: point['base_price'],
    isFavorite: point['is_favorite'],
  };

  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['base_price'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
}
