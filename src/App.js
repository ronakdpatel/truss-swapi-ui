import './App.css';
import { useEffect, useState } from 'react';
import { BusyIndicator } from './BusyIndicator';
import { SortablePlanetTable } from './SortablePlanetTable';
import { ErrorMsgBanner } from './ErrorMsgBanner';
import { calculateWaterSurfaceArea, compareNames } from './helperUtils';

export const App = () => {
  const [state, setState] = useState({ data: null, loading: true });
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const getAPI = async () => {
      try {
        const res = await fetch('https://swapi.dev/api/planets/');
        if (!res.ok) {
          // could set status code and use that as part of error msg
          // right now error msg assumes the error is due to downtime
        }
        const jsonData = await res.json();
        const planetInfo = jsonData.results;
        planetInfo.sort(compareNames);
        planetInfo.map((planetData) => {
          const surfaceArea = calculateWaterSurfaceArea(planetData.diameter, planetData.surface_water);
          planetData['surfaceArea'] = surfaceArea;
          return planetData;
        });
        setState({ data: planetInfo, loading: false });
      } catch {
        setHasError(true);
        setState({ data: null, loading: false });
      }
    };
    getAPI();
  }, []);

  return (
    <div className="App">
      {hasError && <ErrorMsgBanner />}
      {state.loading && <BusyIndicator />}
      {state.data && <SortablePlanetTable planetList={state.data} />}
    </div>
  );
};
