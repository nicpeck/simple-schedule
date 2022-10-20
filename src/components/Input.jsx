import React, { useContext, useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment-timezone';
import { Box, Button, Textarea } from '@chakra-ui/react';
import { DatesContext } from '../providers/DatesProvider';

const Input = () => {
  const { setDates, dates, timezone } = useContext(DatesContext);

  const [input, setInput] = useState('💥\n2022-10-21T20:00:00');
  const [inputError, setInputError] = useState(null);

  const parseInput = async () => {
    const groups = input.trim().split(/\n\n+/);
    if (!groups) {
      return [];
    }

    return _.chain(groups)
      .map(group => {
        const [name, ...dates] = group
          .trim()
          .replace(/\n+/g, '\n')
          .split(/\n+/);
        return dates.map(dateString => {
          const m = moment.tz(dateString, timezone);
          if (!m.isValid()) {
            throw new Error(`Can’t parse date '${dateString}' on ${name}`);
          }
          const date = {
            name,
            date: m.valueOf(),
          };
          if (date.time === '00:00' && !dateString.match(/\d+:\d\d/)) {
            date.time = null;
          }
          return date;
        });
      })
      .flatten()
      .sortBy('date')
      .value();
  };

  useEffect(() => {
    window.inputData = input;
    parseInput()
      .then(data => {
        setDates(data);
        window.dateData = data;
        if (inputError) {
          setInputError(null);
        }
      })
      .catch(err => {
        console.error(err.message);
        setInputError(err.message);
      });
  }, [input]);

  return (
    <Textarea
      value={input}
      width="full"
      onChange={e => {
        setInput(e.target.value);
      }}
      resize="vertical"
      rows={Math.max(5, input.split('\n').length + 2)}
      shadow="md"
    />
  );
};

export default Input;
