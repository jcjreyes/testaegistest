import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Checkmark from '../../components/Checkmark';
import Search from '../../components/Search';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Tag from '../../components/Tag';

import { useQuery } from 'react-query';
import { Photoshoots } from '../../services';

import { format, parseISO } from 'date-fns';
import _ from 'lodash';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import download from './assets/download.svg';
import info from './assets/info.png';
import add from './assets/add.svg';
import left from './assets/left.png';
import right from './assets/right.png';

import EnlistmentExport from './components/EnlistmentExport';
import AddEnlistmentPeriod from './components/AddEnlistmentPeriod';
import ViewEnlistmentPeriod from './components/ViewEnlistmentPeriod';
import PhotoshootPeriod from './components/PhotoshootPeriod';
import PhotoshootInfo from './components/PhotoshootInfo';
import axios from 'axios';

import {
  Section,
  Container,
  Body,
  Column,
  SearchWrapper,
  Row,
  DateWrapper,
  DateCol,
  Day,
  DayDate,
  MonthYear,
  Title,
  Link,
  Info,
  InfoMarker,
  InfoLabel,
  InfoText,
  InfoSubtext,
  ScheduleWrapper,
  ScheduleSlots,
  Schedule,
  ScheduleTitle,
  ScheduleInfo,
  ScheduleText,
  ScheduleTag,
  ArrowButtons,
  TimeSlot,
  Time,
  HoverCard,
  HoverCardText,
  SlotCount,
  SlotContainer,
  CounterButton,
} from './styles';

const PhotoshootDays = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDatetimes, setSelectedDatetimes] = useState([]);
  const [photoshoots, setPhotoshoots] = useState([]);
  const [firstChoice, setFirstChoice] = useState();
  const [secondChoice, setSecondChoice] = useState();
  const [thirdChoice, setThirdChoice] = useState();
  const [fourthChoice, setFourthChoice] = useState();
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [photoshootsLoading, setPhotoshootsLoading] = useState(false);
  var formattedSelectedDate = format(date, 'MMMM d, yyyy');
  var dayToday = format(date, 'iii');
  var dateToday = format(date, 'd');
  var monthYearToday = format(date, 'MMMM y');
  var getDate = format(date, 'yyyy-MM-dd');

  // Get Photoshoot Period Settings
  const { data: settings } = useQuery(
    'settings',
    Photoshoots.getPhotoshootPeriodSettings,
  );

  // Get Photoshoot Periods
  const { data: periods, refetch: periodFetch } = useQuery(
    'periods',
    Photoshoots.getPhotoshootPeriods,
    {
      refetchOnWindowFocus: false,
      enabled: false, // turned off by default, manual refetch is needed
    },
  );

  // Get Enlistment Dates
  const { data: enlistment, refetch } = useQuery(
    'enlistment',
    Photoshoots.getEnlistmentDates,
    {
      refetchOnWindowFocus: false,
      enabled: false, // turned off by default, manual refetch is needed
    },
  );

  const ExportButtonHandler = async () => {
    process.env.NODE_ENV === 'development'
      ? (window.location.href =
          'http://localhost:8000/api/download-photoshoots/')
      : (window.location.href =
          'https://aegis-dj.ateneo.edu/api/download-photoshoots/');
  };

  const ExportButtonHandlerGroups = async () => {
    process.env.NODE_ENV === 'development'
      ? (window.location.href =
          'http://localhost:8000/api/download-group-photoshoots/')
      : (window.location.href =
          'https://aegis-dj.ateneo.edu/api/download-group-photoshoots/');
  };

  useEffect(() => {
    refetch();
    periodFetch();
  }, []);

  var _ = require('lodash');
  var groupedEnlistment =
    enlistment && _.groupBy(enlistment, (date) => date.group);

  // Everytime date changes fetch datetimes and shoots
  useEffect(() => {
    //  Cancel token
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    // Load Slots
    setSlotsLoading(true);
    Photoshoots.getPhotoshootDatetimesWithDate(getDate, source)
      .then((data) => {
        setSelectedDatetimes(data);
        setSlotsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('ditched times');
        }
      });

    // Cancel func
    return () => {
      source.cancel('axios request cancelled');
    };
  }, [date]);

  useEffect(() => {
    //  Cancel token
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    // Load Photoshoots
    setPhotoshootsLoading(true);
    Photoshoots.getPhotoshootsByDate(getDate, source)
      .then((data) => {
        setPhotoshoots(data);
        setPhotoshootsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('ditched dates');
        }
      });

    // Cancel func
    return () => {
      source.cancel('axios request cancelled');
    };
  }, [date]);

  useEffect(() => {
    const uniqueGroupNames = Array.from(
      new Set(selectedDatetimes.map((datetime) => datetime.date.group)),
    );
    setFirstChoice(uniqueGroupNames[0] || null);
    setSecondChoice(uniqueGroupNames[1] || null);
    setThirdChoice(uniqueGroupNames[2] || null);
    setFourthChoice(uniqueGroupNames[3] || null);
  }, [selectedDatetimes]);

  // Get all unique times in a date
  const uniqueTimes = [];
  if (selectedDatetimes) {
    for (const i of selectedDatetimes) {
      if (!uniqueTimes.includes(i.time)) uniqueTimes.push(i.time);
    }

    // Sort times
    uniqueTimes.sort((a, b) => {
      return parseInt(a.slice(0, 2)) - parseInt(b.slice(0, 2));
    });
  }

  const [photoshootId, setPhotoshootId] = useState(null);
  const [periodId, setPeriodId] = useState(null);

  // Get Photoshoots for selected date
  const groupData =
    photoshoots &&
    photoshoots.filter(
      (photoshoot) =>
        photoshoot.photoshoot_datetime.date.available_date === getDate &&
        photoshoot.group_photoshoot != null,
    );
  const somData =
    photoshoots &&
    photoshoots.filter(
      (photoshoot) =>
        photoshoot.photoshoot_datetime.date.available_date === getDate &&
        photoshoot.individual_photoshoot != null &&
        photoshoot.individual_photoshoot.school === 'SOM',
    );
  const sohData =
    photoshoots &&
    photoshoots.filter(
      (photoshoot) =>
        photoshoot.photoshoot_datetime.date.available_date === getDate &&
        photoshoot.individual_photoshoot != null &&
        photoshoot.individual_photoshoot.school === 'SOH',
    );
  const soseData =
    photoshoots &&
    photoshoots.filter(
      (photoshoot) =>
        photoshoot.photoshoot_datetime.date.available_date === getDate &&
        photoshoot.individual_photoshoot != null &&
        photoshoot.individual_photoshoot.school === 'SOSE',
    );
  const sossData =
    photoshoots &&
    photoshoots.filter(
      (photoshoot) =>
        photoshoot.photoshoot_datetime.date.available_date === getDate &&
        photoshoot.individual_photoshoot != null &&
        photoshoot.individual_photoshoot.school === 'SOSS',
    );

  const [activateExport, setActivateExport] = useState(false);
  const [activateAddEnlistment, setActivateAddEnlistment] = useState(false);
  const [activateViewEnlistment, setActivateViewEnlistment] = useState(false);
  const [activateAddPeriod, setActivateAddPeriod] = useState(false);
  const [activatePhotoshootInfo, setActivatePhotoshootInfo] = useState(false);
  const [viewEnlistmentData, setViewEnlistmentData] = useState(null);

  function selectPhotoshootHandler(id) {
    setPhotoshootId(id);
    setActivatePhotoshootInfo(!activatePhotoshootInfo);
  }

  function selectPeriodHandler(id) {
    id ? setPeriodId(id) : setPeriodId(null);
    setActivateAddPeriod(!activateAddPeriod);
  }

  function markerColorHandler(group) {
    if (group === 'SOM') {
      return '#e3af7e';
    } else if (group === 'SOH') {
      return '#F9F6EE';
    } else if (group === 'SOSE') {
      return '#fdc848';
    } else if (group === 'FFA') {
      return '#7C99AC';
    } else {
      return '#e55010';
    }
  }

  const addOnViewEnlistmentHandler = () => {
    setActivateViewEnlistment(false);
    setActivateAddEnlistment(true);
  };

  const viewEnlistmentDataHandler = (group) => {
    var filteredData =
      enlistment &&
      enlistment.filter((enlistment) => enlistment.group === group);
    setViewEnlistmentData(filteredData);
    viewEnlistmentData && setActivateViewEnlistment(!activateViewEnlistment);
  };

  const attendedHandler = (id, attended) => {
    Photoshoots.updatePhotoshootStatus(id, {
      attended: attended,
    });
  };

  // Subtract slots
  const subtractSlot = (choice, time) => {
    const dateTime = selectedDatetimes.find(
      (datetime) => datetime.time === time && datetime.date.group === choice,
    );
    if (!dateTime) {
      alert(
        'A datetime for this was never created. Please add one in Photoshoot Periods',
      );
      return;
    }
    if (dateTime.slots > 0) {
      const newDateTimes = selectedDatetimes.map((dt) =>
        dt.id === dateTime.id
          ? { ...dateTime, slots: (dateTime.slots -= 1) }
          : dt,
      );
      setSelectedDatetimes(newDateTimes);
      Photoshoots.modifySlots(dateTime.id, 'subtract');
    }
  };

  // Add slots
  const addSlot = (choice, time) => {
    const dateTime = selectedDatetimes.find(
      (datetime) => datetime.time === time && datetime.date.group === choice,
    );
    if (!dateTime) {
      alert(
        'A datetime for this was never created. Please add one in Photoshoot Periods',
      );
      return;
    }
    const newDateTimes = selectedDatetimes.map((dt) =>
      dt.id === dateTime.id
        ? { ...dateTime, slots: (dateTime.slots += 1) }
        : dt,
    );
    setSelectedDatetimes(newDateTimes);
    Photoshoots.modifySlots(dateTime.id, 'add');
  };

  return (
    <>
      <Section>
        <Header dashboard={false} pageLabel='Photoshoot Dashboard' />
      </Section>
      <Section>
        <Container>
          <Body>
            <Column>
              {/* <SearchWrapper>
                                <Search placeholder="Search for an item..." />
                            </SearchWrapper> */}
              <Calendar value={date} onChange={(value) => setDate(value)} />
              <Row>
                {/* <DateWrapper>
                                    <DateCol> */}
                <Day className='muted'>Selected Data</Day>
                <DayDate className='muted'>{formattedSelectedDate}</DayDate>
                {/* </DateCol>
                                </DateWrapper> */}
                {/* <Button reverse={true} icon={download} label="Export as CSV" onClick={() => setActivateExport(!activateExport)} /> */}
              </Row>
              <hr className='lighter' />
              <Row>
                <Title>Photoshoot Periods</Title>
                {/* <Link onClick={() => setActivateViewEnlistment(!activateViewEnlistment)}>View All</Link> */}
              </Row>
              {periods && periods ? (
                periods.map((period) => {
                  var earliest =
                    period && period.earliest
                      ? format(parseISO(period?.earliest), 'MMM d, yyyy')
                      : 'Date not assigned';

                  var latest =
                    period && period.latest
                      ? format(parseISO(period?.latest), 'MMM d, yyyy')
                      : 'Date not assigned';

                  return (
                    <Info>
                      <InfoMarker />
                      <InfoLabel
                      // onClick={() =>
                      //     selectPeriodHandler(
                      //         period.id
                      //     )
                      // }
                      >
                        {period.title}
                      </InfoLabel>
                      <InfoText>{period.type}</InfoText>
                      <InfoSubtext>
                        {earliest === latest
                          ? earliest
                          : `${earliest} to ${latest}`}
                      </InfoSubtext>
                    </Info>
                  );
                })
              ) : (
                <Spinner />
              )}
              <Row>
                <Button
                  type='button'
                  add={true}
                  reverse={false}
                  height='32px'
                  width='100%'
                  icon={add}
                  onClick={() => setActivateAddPeriod(!activateAddPeriod)}
                />
              </Row>
              <Row>
                <Title>Enlistment Dates</Title>
              </Row>
              {groupedEnlistment && groupedEnlistment ? (
                <>
                  {groupedEnlistment &&
                    Object.keys(groupedEnlistment).map((groupKey) =>
                      groupedEnlistment[groupKey].map((e) => (
                        <Info key={e.date}>
                          <InfoMarker color={markerColorHandler(groupKey)} />
                          <InfoLabel
                            onClick={() => viewEnlistmentDataHandler(groupKey)}
                          >
                            {groupKey}
                          </InfoLabel>
                          <InfoText className='normal'>
                            {format(parseISO(e.date), 'MMM d, yyyy')}
                          </InfoText>
                          <InfoSubtext className='lighter'>
                            {e.time_from} to {e.time_to}
                          </InfoSubtext>
                        </Info>
                      )),
                    )}
                </>
              ) : (
                <Spinner />
              )}
              <Row>
                <Button
                  type='button'
                  add={true}
                  reverse={false}
                  height='32px'
                  width='100%'
                  icon={add}
                  onClick={() =>
                    setActivateAddEnlistment(!activateAddEnlistment)
                  }
                />
              </Row>
              <Row>
                <Button
                  type='button'
                  reverse={true}
                  paddingX='16px'
                  paddingY='8px'
                  label='Export as CSV'
                  onClick={ExportButtonHandler}
                />
              </Row>
              <Row>
                <Button
                  type='button'
                  reverse={true}
                  paddingX='16px'
                  paddingY='8px'
                  label='Export Groups as CSV'
                  onClick={ExportButtonHandlerGroups}
                />
              </Row>
            </Column>
            <Column>
              <ScheduleWrapper>
                <ArrowButtons>
                  <img
                    src={left}
                    onClick={() => {
                      setDate(new Date(date.setDate(date.getDate() - 1)));
                    }}
                  />
                  <img
                    src={right}
                    onClick={() => {
                      setDate(new Date(date.setDate(date.getDate() + 1)));
                    }}
                  />
                </ArrowButtons>
                <Row className='schedule__header'>
                  <DateWrapper>
                    <DateCol className='centered'>
                      <Day>{dayToday}</Day>
                      <DayDate>{dateToday}</DayDate>
                    </DateCol>
                    <MonthYear>{monthYearToday}</MonthYear>
                  </DateWrapper>
                  {/* <DateWrapper className="end">
                                        <DateCol className="end">
                                            <Day className="schedule__label">
                                                Slots
                                            </Day>
                                            <DayDate>24</DayDate>
                                        </DateCol>
                                    </DateWrapper> */}
                </Row>
              </ScheduleWrapper>
              {slotsLoading || photoshootsLoading ? (
                <Spinner />
              ) : selectedDatetimes ? (
                !Array.isArray(selectedDatetimes) ||
                !selectedDatetimes.length ? (
                  <Row className='centered'>
                    <Title>No Scheduled Photoshoots...</Title>
                  </Row>
                ) : (
                  <ScheduleWrapper className='schedules'>
                    {uniqueTimes.map((time) => {
                      var timeList = String(time).split(':');
                      var formattedTime = format(
                        new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                          timeList[0],
                          timeList[1],
                          timeList[2],
                        ),
                        'h:mm a',
                      );
                      var groupPhotoshoots =
                        groupData &&
                        groupData.filter(
                          (photoshoot) =>
                            photoshoot.photoshoot_datetime.time === time,
                        );
                      var firstchoicePhotoshoots =
                        somData &&
                        somData.filter(
                          (photoshoot) =>
                            photoshoot.photoshoot_datetime.time === time,
                        );
                      var secondchoicePhotoshoots =
                        sohData &&
                        sohData.filter(
                          (photoshoot) =>
                            photoshoot.photoshoot_datetime.time === time,
                        );
                      var thirdchoicePhotoshoots =
                        soseData &&
                        soseData.filter(
                          (photoshoot) =>
                            photoshoot.photoshoot_datetime.time === time,
                        );
                      var fourthchoicePhotoshoots =
                        sossData &&
                        sossData.filter(
                          (photoshoot) =>
                            photoshoot.photoshoot_datetime.time === time,
                        );
                      return (
                        <>
                          {(groupPhotoshoots && groupPhotoshoots.length) ||
                          (firstchoicePhotoshoots &&
                            firstchoicePhotoshoots.length) ||
                          (secondchoicePhotoshoots &&
                            secondchoicePhotoshoots.length) ||
                          (thirdchoicePhotoshoots &&
                            thirdchoicePhotoshoots.length) ||
                          (fourthchoicePhotoshoots &&
                            fourthchoicePhotoshoots.length) ? (
                            <>
                              <Row className='timeslot full__width'>
                                <TimeSlot>
                                  <Time>{formattedTime}</Time>
                                </TimeSlot>
                                <hr className='lighter' />
                              </Row>
                              <Row>
                                <SlotContainer>
                                  {console.log(selectedDatetimes)}
                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group,
                                  ).length > 0 && (
                                    <SlotCount className='som'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot(firstChoice, time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      {firstChoice}{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group === firstChoice,
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() =>
                                          addSlot(firstChoice, time)
                                        }
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}

                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group,
                                  ).length > 0 && (
                                    <SlotCount className='sose'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot(secondChoice, time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      {secondChoice}{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group ===
                                              secondChoice,
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() =>
                                          addSlot(secondChoice, time)
                                        }
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}

                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group,
                                  ).length > 0 && (
                                    <SlotCount className='soss'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot(thirdChoice, time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      {thirdChoice}{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group === thirdChoice,
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() =>
                                          addSlot(thirdChoice, time)
                                        }
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}
                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group,
                                  ).length > 0 && (
                                    <SlotCount className='soh'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot(fourthChoice, time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      {fourthChoice}{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group ===
                                              fourthChoice,
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() =>
                                          addSlot(fourthChoice, time)
                                        }
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}

                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group === 'GROUP',
                                  ).length > 0 && (
                                    <SlotCount className='group'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot('GROUP', time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      GRP:{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group === 'GROUP',
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() => addSlot('GROUP', time)}
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}
                                </SlotContainer>
                              </Row>
                              {groupPhotoshoots && groupPhotoshoots.length ? (
                                <Row className='full__width'>
                                  <TimeSlot>
                                    <HoverCard>
                                      <HoverCardText>GRPS</HoverCardText>
                                    </HoverCard>
                                  </TimeSlot>
                                  <ScheduleSlots>
                                    {groupPhotoshoots.map((photoshoot) => (
                                      <Schedule>
                                        <ScheduleTitle>
                                          {photoshoot.group_photoshoot.name}
                                        </ScheduleTitle>
                                        <ScheduleText>
                                          {
                                            photoshoot.group_photoshoot
                                              .emergency_contact_name
                                          }
                                        </ScheduleText>
                                        <ScheduleTag>
                                          <Tag
                                            tag={
                                              photoshoot.group_photoshoot
                                                .subgroup
                                            }
                                          />
                                        </ScheduleTag>

                                        <ScheduleInfo
                                          src={info}
                                          onClick={() =>
                                            selectPhotoshootHandler(
                                              photoshoot.id,
                                            )
                                          }
                                        />
                                        <ScheduleText className='attendance'>
                                          Attendance
                                        </ScheduleText>
                                        <Checkmark
                                          checked={photoshoot.attended}
                                          onClick={() => {
                                            attendedHandler(
                                              photoshoot.id,
                                              !photoshoot.attended,
                                            );
                                            // Update state
                                            const updatedPs = photoshoots.find(
                                              (p) => p.id === photoshoot.id,
                                            );
                                            setPhotoshoots(
                                              photoshoots.map((ps) =>
                                                ps.id === updatedPs.id
                                                  ? {
                                                      ...updatedPs,
                                                      attended:
                                                        !updatedPs.attended,
                                                    }
                                                  : ps,
                                              ),
                                            );
                                          }}
                                        />
                                      </Schedule>
                                    ))}
                                  </ScheduleSlots>
                                </Row>
                              ) : (
                                <></>
                              )}
                              {firstchoicePhotoshoots &&
                              firstchoicePhotoshoots.length ? (
                                <Row className='full__width'>
                                  <TimeSlot>
                                    <HoverCard color='#E3AF7E'>
                                      <HoverCardText>Drab</HoverCardText>
                                    </HoverCard>
                                  </TimeSlot>
                                  <ScheduleSlots>
                                    {firstchoicePhotoshoots.map(
                                      (photoshoot) => (
                                        <Schedule>
                                          <ScheduleTitle className='id__number'>
                                            {
                                              photoshoot.individual_photoshoot
                                                .id_number
                                            }
                                          </ScheduleTitle>
                                          <ScheduleText className='extend'>
                                            {
                                              photoshoot.individual_photoshoot
                                                .name
                                            }
                                          </ScheduleText>
                                          {photoshoot.individual_photoshoot
                                            .is_scholar ? (
                                            <ScheduleTag>
                                              <Tag tag='Scholar' />
                                            </ScheduleTag>
                                          ) : (
                                            <ScheduleTag />
                                          )}
                                          <ScheduleInfo
                                            src={info}
                                            onClick={() =>
                                              selectPhotoshootHandler(
                                                photoshoot.id,
                                              )
                                            }
                                          />
                                          <ScheduleText>
                                            Attendance
                                          </ScheduleText>
                                          <Checkmark
                                            checked={photoshoot.attended}
                                            onClick={() => {
                                              attendedHandler(
                                                photoshoot.id,
                                                !photoshoot.attended,
                                              );
                                              // Update state
                                              const updatedPs =
                                                photoshoots.find(
                                                  (p) => p.id === photoshoot.id,
                                                );
                                              setPhotoshoots(
                                                photoshoots.map((ps) =>
                                                  ps.id === updatedPs.id
                                                    ? {
                                                        ...updatedPs,
                                                        attended:
                                                          !updatedPs.attended,
                                                      }
                                                    : ps,
                                                ),
                                              );
                                            }}
                                          />
                                        </Schedule>
                                      ),
                                    )}
                                  </ScheduleSlots>
                                </Row>
                              ) : (
                                <></>
                              )}
                              {secondchoicePhotoshoots &&
                              secondchoicePhotoshoots.length ? (
                                <Row className='full__width'>
                                  <TimeSlot>
                                    <HoverCard color='#F9F6EE'>
                                      <HoverCardText>White</HoverCardText>
                                    </HoverCard>
                                  </TimeSlot>
                                  <ScheduleSlots>
                                    {secondchoicePhotoshoots.map(
                                      (photoshoot) => (
                                        <Schedule>
                                          <ScheduleTitle className='id__number'>
                                            {
                                              photoshoot.individual_photoshoot
                                                .id_number
                                            }
                                          </ScheduleTitle>
                                          <ScheduleText className='extend'>
                                            {
                                              photoshoot.individual_photoshoot
                                                .name
                                            }
                                          </ScheduleText>
                                          {photoshoot.individual_photoshoot
                                            .is_scholar ? (
                                            <ScheduleTag>
                                              <Tag tag='Scholar' />
                                            </ScheduleTag>
                                          ) : (
                                            <ScheduleTag />
                                          )}
                                          <ScheduleInfo
                                            src={info}
                                            onClick={() =>
                                              selectPhotoshootHandler(
                                                photoshoot.id,
                                              )
                                            }
                                          />
                                          <ScheduleText>
                                            Attendance
                                          </ScheduleText>
                                          <Checkmark
                                            checked={photoshoot.attended}
                                            onClick={() => {
                                              attendedHandler(
                                                photoshoot.id,
                                                !photoshoot.attended,
                                              );
                                              // Update state
                                              const updatedPs =
                                                photoshoots.find(
                                                  (p) => p.id === photoshoot.id,
                                                );
                                              setPhotoshoots(
                                                photoshoots.map((ps) =>
                                                  ps.id === updatedPs.id
                                                    ? {
                                                        ...updatedPs,
                                                        attended:
                                                          !updatedPs.attended,
                                                      }
                                                    : ps,
                                                ),
                                              );
                                            }}
                                          />
                                        </Schedule>
                                      ),
                                    )}
                                  </ScheduleSlots>
                                </Row>
                              ) : (
                                <></>
                              )}
                              {thirdchoicePhotoshoots &&
                              thirdchoicePhotoshoots.length ? (
                                <Row className='full__width'>
                                  <TimeSlot>
                                    <HoverCard color='#FDC848'>
                                      <HoverCardText>
                                        Golden Yellow
                                      </HoverCardText>
                                    </HoverCard>
                                  </TimeSlot>
                                  <ScheduleSlots>
                                    {thirdchoicePhotoshoots.map(
                                      (photoshoot) => (
                                        <Schedule>
                                          <ScheduleTitle className='id__number'>
                                            {
                                              photoshoot.individual_photoshoot
                                                .id_number
                                            }
                                          </ScheduleTitle>
                                          <ScheduleText className='extend'>
                                            {
                                              photoshoot.individual_photoshoot
                                                .name
                                            }
                                          </ScheduleText>
                                          {photoshoot.individual_photoshoot
                                            .is_scholar ? (
                                            <ScheduleTag>
                                              <Tag tag='Scholar' />
                                            </ScheduleTag>
                                          ) : (
                                            <ScheduleTag />
                                          )}
                                          <ScheduleInfo
                                            src={info}
                                            onClick={() =>
                                              selectPhotoshootHandler(
                                                photoshoot.id,
                                              )
                                            }
                                          />
                                          <ScheduleText>
                                            Attendance
                                          </ScheduleText>
                                          <Checkmark
                                            checked={photoshoot.attended}
                                            onClick={() => {
                                              attendedHandler(
                                                photoshoot.id,
                                                !photoshoot.attended,
                                              );
                                              // Update state
                                              const updatedPs =
                                                photoshoots.find(
                                                  (p) => p.id === photoshoot.id,
                                                );
                                              setPhotoshoots(
                                                photoshoots.map((ps) =>
                                                  ps.id === updatedPs.id
                                                    ? {
                                                        ...updatedPs,
                                                        attended:
                                                          !updatedPs.attended,
                                                      }
                                                    : ps,
                                                ),
                                              );
                                            }}
                                          />
                                        </Schedule>
                                      ),
                                    )}
                                  </ScheduleSlots>
                                </Row>
                              ) : (
                                <></>
                              )}
                              {fourthchoicePhotoshoots &&
                              fourthchoicePhotoshoots.length ? (
                                <Row className='full__width'>
                                  <TimeSlot>
                                    <HoverCard color='#E55010'>
                                      <HoverCardText>Orange</HoverCardText>
                                    </HoverCard>
                                  </TimeSlot>
                                  <ScheduleSlots>
                                    {fourthchoicePhotoshoots.map(
                                      (photoshoot) => (
                                        <Schedule>
                                          <ScheduleTitle className='id__number'>
                                            {
                                              photoshoot.individual_photoshoot
                                                .id_number
                                            }
                                          </ScheduleTitle>
                                          <ScheduleText className='extend'>
                                            {
                                              photoshoot.individual_photoshoot
                                                .name
                                            }
                                          </ScheduleText>
                                          {photoshoot.individual_photoshoot
                                            .is_scholar ? (
                                            <ScheduleTag>
                                              <Tag tag='Scholar' />
                                            </ScheduleTag>
                                          ) : (
                                            <ScheduleTag />
                                          )}
                                          <ScheduleInfo
                                            src={info}
                                            onClick={() =>
                                              selectPhotoshootHandler(
                                                photoshoot.id,
                                              )
                                            }
                                          />
                                          <ScheduleText>
                                            Attendance
                                          </ScheduleText>
                                          <Checkmark
                                            checked={photoshoot.attended}
                                            onClick={() => {
                                              attendedHandler(
                                                photoshoot.id,
                                                !photoshoot.attended,
                                              );
                                              // Update state
                                              const updatedPs =
                                                photoshoots.find(
                                                  (p) => p.id === photoshoot.id,
                                                );
                                              setPhotoshoots(
                                                photoshoots.map((ps) =>
                                                  ps.id === updatedPs.id
                                                    ? {
                                                        ...updatedPs,
                                                        attended:
                                                          !updatedPs.attended,
                                                      }
                                                    : ps,
                                                ),
                                              );
                                            }}
                                          />
                                        </Schedule>
                                      ),
                                    )}
                                  </ScheduleSlots>
                                </Row>
                              ) : (
                                <></>
                              )}
                              {/* <Row className="full__width add__button">
                                                                <TimeSlot></TimeSlot>
                                                                <Button
                                                                    type="button"
                                                                    add={true}
                                                                    reverse={
                                                                        false
                                                                    }
                                                                    height="32px"
                                                                    width="100%"
                                                                    icon={add}
                                                                    onClick={() =>
                                                                        console.log(
                                                                            "Add Changes!"
                                                                        )
                                                                    }
                                                                />
                                                            </Row> */}
                            </>
                          ) : (
                            <>
                              <Row className='timeslot full__width'>
                                <TimeSlot>
                                  <Time>{formattedTime}</Time>
                                </TimeSlot>
                                <hr className='lighter' />
                              </Row>
                              <Row>
                                <SlotContainer>
                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group === 'SOM',
                                  ).length > 0 && (
                                    <SlotCount className='som'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot('SOM', time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      Drab:{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group === 'SOM',
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() => addSlot('SOM', time)}
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}

                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group === 'SOSE',
                                  ).length > 0 && (
                                    <SlotCount className='sose'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot('SOSE', time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      Golden Yellow:{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group === 'SOSE',
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() => addSlot('SOSE', time)}
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}

                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group === 'SOSS',
                                  ).length > 0 && (
                                    <SlotCount className='soss'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot('SOSS', time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      Orange:{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group === 'SOSS',
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() => addSlot('SOSS', time)}
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}
                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group === 'SOH',
                                  ).length > 0 && (
                                    <SlotCount className='soh'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot('SOH', time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      White:{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group === 'SOH',
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() => addSlot('SOH', time)}
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}

                                  {selectedDatetimes.filter(
                                    (datetime) =>
                                      datetime.time === time &&
                                      datetime.date.group === 'GROUP',
                                  ).length > 0 && (
                                    <SlotCount className='group'>
                                      <CounterButton
                                        onClick={() =>
                                          subtractSlot('GROUP', time)
                                        }
                                      >
                                        -
                                      </CounterButton>
                                      GRP:{' '}
                                      {selectedDatetimes
                                        .filter(
                                          (datetime) =>
                                            datetime.time === time &&
                                            datetime.date.group === 'GROUP',
                                        )
                                        ?.reduce((acc, item) => {
                                          return acc + item.slots;
                                        }, 0)}
                                      <CounterButton
                                        onClick={() => addSlot('GROUP', time)}
                                      >
                                        +
                                      </CounterButton>
                                    </SlotCount>
                                  )}
                                </SlotContainer>
                              </Row>
                              <Row className='centered'>
                                <DayDate className='muted'>
                                  No Scheduled Photoshoots...
                                </DayDate>
                              </Row>
                            </>
                          )}
                        </>
                      );
                    })}
                  </ScheduleWrapper>
                )
              ) : (
                <Spinner />
              )}
            </Column>
          </Body>
        </Container>
      </Section>

      {/* Modals */}
      {activateExport ? (
        <EnlistmentExport onExit={() => setActivateExport(!activateExport)} />
      ) : (
        <></>
      )}
      {activateAddEnlistment ? (
        <AddEnlistmentPeriod
          onExit={() => {
            setActivateAddEnlistment(!activateAddEnlistment);
            refetch();
          }}
          periods={periods && periods}
        />
      ) : (
        <></>
      )}
      {activateViewEnlistment ? (
        <ViewEnlistmentPeriod
          onExit={() => {
            setActivateViewEnlistment(!activateViewEnlistment);
          }}
          onAdd={addOnViewEnlistmentHandler}
          data={viewEnlistmentData && viewEnlistmentData}
        />
      ) : (
        <></>
      )}
      {activateAddPeriod ? (
        <PhotoshootPeriod
          periodId={periodId}
          settings={settings && settings[0]}
          onExit={() => {
            setActivateAddPeriod(!activateAddPeriod);
            periodFetch();
          }}
        />
      ) : (
        <></>
      )}
      {activatePhotoshootInfo ? (
        <PhotoshootInfo
          photoshoot={photoshootId}
          photoshoots={photoshoots}
          setPhotoshoots={setPhotoshoots}
          selectedDatetimes={selectedDatetimes}
          setSelectedDatetimes={setSelectedDatetimes}
          onExit={() => setActivatePhotoshootInfo(!activatePhotoshootInfo)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default PhotoshootDays;
