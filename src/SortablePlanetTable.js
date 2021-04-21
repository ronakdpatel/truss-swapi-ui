import './Table.css';
import { Table } from 'semantic-ui-react';
import { useState } from 'react';
import {
  compareNames,
  comparePopulations,
  compareResidents,
  compareSurfaceAreas,
  formatNumber,
  getSortedDirectionClass,
  isUnknown
} from './helperUtils';

const NAME = 'name';
const RESIDENTS = 'residents';
const POPULATION = 'population';
const SURFACE_AREA = 'surfaceArea';
const ASC = 'asc';
const DESC = 'desc';

export const SortablePlanetTable = ({ planetList }) => {
  const [sortedState, setSortedState] = useState({ column: NAME, direction: ASC });

  const handleOnClickSort = (targetCol) => {
    const { column, direction } = sortedState;
    let newDirection;
    if (column === targetCol) {
      newDirection = direction === ASC ? DESC : ASC;
    } else {
      newDirection = ASC; // default direction
    }

    setSortedState({ column: targetCol, direction: newDirection });
    switch (targetCol) {
      case NAME:
        planetList = planetList.sort(compareNames);
        break;
      case RESIDENTS:
        planetList = planetList.sort(compareResidents);
        break;
      case POPULATION:
        planetList = planetList.sort(comparePopulations);
        break;
      case SURFACE_AREA:
        planetList = planetList.sort(compareSurfaceAreas);
        break;
      default:
      // do nothing, all cases should be handled above
    }
    if (newDirection === DESC) {
      planetList.reverse();
    }
  };

  return (
    <Table celled striped stackable color="blue">
      <Table.Header>
        <Table.Row>
          {/* Could refactor this section to reduce the repetition */}
          <Table.HeaderCell
            className={getSortedDirectionClass(sortedState.column, NAME, sortedState.direction)}
            onClick={() => handleOnClickSort(NAME)}
          >
            Planet Name
          </Table.HeaderCell>
          <Table.HeaderCell>Climate</Table.HeaderCell>
          <Table.HeaderCell>Terrain</Table.HeaderCell>
          {/* Could show population in thousands to reduce the number of digits shown - would be better for non desktops */}
          <Table.HeaderCell
            className={'numerical ' + getSortedDirectionClass(sortedState.column, POPULATION, sortedState.direction)}
            onClick={() => handleOnClickSort(POPULATION)}
          >
            Population
          </Table.HeaderCell>
          <Table.HeaderCell
            className={'numerical ' + getSortedDirectionClass(sortedState.column, RESIDENTS, sortedState.direction)}
            onClick={() => handleOnClickSort(RESIDENTS)}
          >
            # of Residents
          </Table.HeaderCell>
          <Table.HeaderCell
            className={'numerical ' + getSortedDirectionClass(sortedState.column, SURFACE_AREA, sortedState.direction)}
            onClick={() => handleOnClickSort(SURFACE_AREA)}
          >
            Water Surface Area (in km²)
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {planetList.map((planetData, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <a href={planetData.url} target="_blank" rel="noreferrer">
                  {isUnknown(planetData.name) ? '?' : planetData.name}
                </a>
              </Table.Cell>
              <Table.Cell>{isUnknown(planetData.sortedClimate) ? '?' : planetData.sortedClimate}</Table.Cell>
              <Table.Cell>{isUnknown(planetData.sortedTerrain) ? '?' : planetData.sortedTerrain}</Table.Cell>
              <Table.Cell className="numerical">
                {isUnknown(planetData.population) ? '?' : formatNumber(planetData.population)}
              </Table.Cell>
              <Table.Cell className="numerical">{formatNumber(planetData.residents.length)}</Table.Cell>
              <Table.Cell className="numerical">
                {isUnknown(planetData.surfaceArea) ? '?' : formatNumber(planetData.surfaceArea)}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
