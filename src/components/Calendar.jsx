import React, { useContext, useMemo } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Stack, Text, Box, VStack, StackDivider } from '@chakra-ui/react';

import { DatesContext } from '../providers/DatesProvider';

const Calendar = () => {
  const { dates, timezone } = useContext(DatesContext);
  const timeline = useMemo(() => (
    _.chain(dates)
      .sortBy('date')
      .groupBy(({ date }) => moment(date).format('YYYY-MM-DD'))
      .toPairs()
      .map(([day, events]) => ({
        date: moment(day),
        events: _.chain(events)
          .map((event) => {
            const eventDate = moment(event.date);
            return {
              key: `${event.name}-${eventDate.toString()}`,
              name: event.name,
              date: eventDate
            };
          })
          .uniqBy('key')
          .value()
      }))
      .value()
  ), [dates]);

  return (
    <VStack align="flex-start" divider={<StackDivider borderColor='gray.200' />}>
      {timeline.map(({ date, events }) => (
        <Stack key={date.toString()} direction={['column', 'row']}>
          <Text fontSize="md">{date.format('ddd D/M')}</Text>
          <VStack divider={<StackDivider borderColor='gray.200' />}>
            {events.map(({ name, date, key: eventKey }) => (
              <Text key={eventKey}>
                <Text as="span">{name}</Text>
                &nbsp;
                <Text as="span" fontSize="sm">{date.format('h:mma')}</Text>
              </Text>
            ))}
          </VStack>
        </Stack>
      ))}
    </VStack>
  );
};

export default Calendar;