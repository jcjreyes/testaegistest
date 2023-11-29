import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import invite from './assets/invite.png';
import alarm from './assets/alarm.png';
import alarm_active from './assets/alarm_active.png';
import individual from './assets/individual.png';
import individual_active from './assets/individual_active.png';
import group from './assets/group.png';
import group_active from './assets/group_active.png';
import plus from './assets/plus.png';
import minus from './assets/minus.png';
import Input from '../Input';
import Select from 'react-select';
import ToggleSwitch from '../../../../components/ToggleSwitch';
import Button from '../../../../components/Button';
import { format, parseISO } from 'date-fns';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeRange from 'react-time-range';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useQuery } from 'react-query';
import { Photoshoots } from '../../../../services';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../../../components/Spinner';

import {
  ModalContainer,
  ModalCard,
  ModalHeader,
  ModalHeaderTitle,
  ModalHeaderActivation,
  ModalHeaderActivationText,
  ModalBody,
  ModalBodyCol,
  ModalBodyRow,
  ModalBodyRowStart,
  ModalBodyRowStartActive,
  ModalBodyTotals,
  ModalBodyTotalHeader,
  ModalBodyTotalContent,
  ModalBodyTotalContentBold,
  ModalBodyMarker,
  ModalBodyHeader,
  ModalBodyIcon,
  ModalBodyText,
  ModalBodyAction,
  ModalBodySubtitle,
  InfoIcon,
  Info,
  InfoLabel,
  InfoText,
  TableHeaderRow,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBodyTitle,
  TableCellEnlistment,
  TableCellInput,
  EnlistmentImg,
  EnlistmentDate,
  NumberButton,
  NumberInput,
  FFAContainer,
  FFADescription,
  FFATitle,
  FFAText,
  FFAEnlistment,
  ModalFooter,
  ModalFooterContent,
  SlotLoading,
} from './styles';

const photoshootPeriodSchema = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
});

const schoolOptions = [
  { value: 'SOM', label: 'Drab', color: '#E3AF7E' },
  { value: 'SOH', label: 'White', color: '#F9F6EE' },
  { value: 'SOSE', label: 'Golden Yellow', color: '#FDC848' },
  { value: 'SOSS', label: 'Orange', color: '#E55010' },
  { value: 'FFA', label: 'FFA', color: 'dark gray' },
  { value: 'AB AM', label: 'AB AM', color: '#0F0F0F' },
  { value: 'AB ChnS', label: 'AB ChnS', color: '#0F0F0F' },
  { value: 'AB COM', label: 'AB COM', color: '#0F0F0F' },
  { value: 'AB DS', label: 'AB DS', color: '#0F0F0F' },
  { value: 'AB DipIR', label: 'AB DipIR', color: '#0F0F0F' },
  { value: 'AB EC-H', label: 'AB EC-H', color: '#0F0F0F' },
  { value: 'AB EC', label: 'AB EC', color: '#0F0F0F' },
  { value: 'AB EU', label: 'AB EU', color: '#0F0F0F' },
  { value: 'AB HI', label: 'AB HI', color: '#0F0F0F' },
  { value: 'AB HUM', label: 'AB HUM', color: '#0F0F0F' },
  { value: 'AB IS', label: 'AB IS', color: '#0F0F0F' },
  { value: 'AB LIT ENG', label: 'AB LIT ENG', color: '#0F0F0F' },
  { value: 'AB LIT FIL', label: 'AB LIT FIL', color: '#0F0F0F' },
  { value: 'AB MEC', label: 'AB MEC', color: '#0F0F0F' },
  { value: 'AB PH', label: 'AB PH', color: '#0F0F0F' },
  { value: 'AB POS', label: 'AB POS', color: '#0F0F0F' },
  { value: 'AB PSY', label: 'AB PSY', color: '#0F0F0F' },
  { value: 'AB SOS', label: 'AB SOS', color: '#0F0F0F' },
  { value: 'AB SOCIO', label: 'AB SOCIO', color: '#0F0F0F' },
  { value: 'BFA AM', label: 'BFA AM', color: '#0F0F0F' },
  { value: 'BFA CW', label: 'BFA CW', color: '#0F0F0F' },
  { value: 'BFA ID', label: 'BFA ID', color: '#0F0F0F' },
  { value: 'BFA TA', label: 'BFA TA', color: '#0F0F0F' },
  { value: 'BS AMF', label: 'BS AMF', color: '#0F0F0F' },
  { value: 'BS AMDSc', label: 'BS AMDSc', color: '#0F0F0F' },
  { value: 'BS APS', label: 'BS APS', color: '#0F0F0F' },
  { value: 'BS MSE', label: 'BS MSE', color: '#0F0F0F' },
  { value: 'BS BIO', label: 'BS BIO', color: '#0F0F0F' },
  { value: 'BS CH', label: 'BS CH', color: '#0F0F0F' },
  { value: 'BS COMTECH', label: 'BS COMTECH', color: '#0F0F0F' },
  { value: 'BS CoE', label: 'BS CoE', color: '#0F0F0F' },
  { value: 'BS CS', label: 'BS CS', color: '#0F0F0F' },
  { value: 'BS DGDD', label: 'BS DGDD', color: '#0F0F0F' },
  { value: 'BS EcE', label: 'BS EcE', color: '#0F0F0F' },
  { value: 'BS ES', label: 'BS ES', color: '#0F0F0F' },
  { value: 'BS HS', label: 'BS HS', color: '#0F0F0F' },
  { value: 'BS ITE', label: 'BS ITE', color: '#0F0F0F' },
  { value: 'BS LM', label: 'BS LM', color: '#0F0F0F' },
  { value: 'BS LfSci', label: 'BS LfSci', color: '#0F0F0F' },
  { value: 'BS MGT', label: 'BS MGT', color: '#0F0F0F' },
  { value: 'BS MGTH', label: 'BS MGT-H', color: '#0F0F0F' },
  { value: 'BS ME', label: 'BS ME', color: '#0F0F0F' },
  { value: 'BS MIS', label: 'BS MIS', color: '#0F0F0F' },
  { value: 'BS MAC', label: 'BS MAC', color: '#0F0F0F' },
  { value: 'BS MA', label: 'BS MA', color: '#0F0F0F' },
  { value: 'BS PS', label: 'BS PS', color: '#0F0F0F' },
  { value: 'BS PSY', label: 'BS PSY', color: '#0F0F0F' },
  { value: 'BS RENT', label: 'BS RENT', color: '#0F0F0F' },
];

const PhotoshootPeriod = ({ periodId, data, settings, onExit }) => {
  const [submitType, setSubmitType] = useState(null);
  const [active, setActive] = useState(false);
  const [activeIndividual, setActiveIndividual] = useState(false);
  const [activeGroup, setActiveGroup] = useState(false);
  const [activeAddLater, setActiveAddLater] = useState(false);
  const [addTimeInterval, setAddTimeInterval] = useState(false);
  const [initial, setInitial] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!periodId) {
      const pulledInitial = Photoshoots.getSinglePeriod(periodId);
      setInitial(pulledInitial);
    }
  }, []);

  const InitialValues =
    initial && initial
      ? {
          title: 'Set Wow',
          first_choice_slots: 3,
          second_choice_slots: 3,
          third_choice_slots: 3,
          fourth_choice_slots: 3,
          groupSlots: 12,
        }
      : {
          title: 'Set n',
          first_choice_slots: 3,
          second_choice_slots: 3,
          third_choice_slots: 3,
          fourth_choice_slots: 3,
          groupSlots: 12,
        };

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  let startDate = format(dateRange[0], 'MMM dd, yyyy');
  let endDate = format(dateRange[1], 'MMM dd, yyyy');

  const [timeRange, setTimeRange] = useState([
    '2021-05-26T04:00:00.886Z',
    '2021-05-26T10:00:00.886Z',
  ]);
  let startTime = format(parseISO(timeRange[0]), 'h:mm a');
  let endTime = format(parseISO(timeRange[1]), 'h:mm a');
  let submitStartTime = format(parseISO(timeRange[0]), 'HH:mm:ss');
  let submitEndTime = format(parseISO(timeRange[1]), 'HH:mm:ss');

  const [slots, setSlots] = useState({
    first_choice_slots: 3,
    second_choice_slots: 3,
    third_choice_slots: 3,
    fourth_choice_slots: 3,
    groupSlots: 12,
  });

  const individualHandler = () => {
    setActive(!active);
    setActiveIndividual(!activeIndividual);
    setSubmitType('Individual');
  };

  const groupHandler = () => {
    setActive(!active);
    setActiveGroup(!activeGroup);
    setSubmitType('Group');
  };

  const addLaterHandler = () => {
    setActiveAddLater(!activeAddLater);
    setSubmitType('Add Later');
  };

  return (
    <ModalContainer>
      <Formik
        initialValues={InitialValues}
        validationSchema={photoshootPeriodSchema}
        onSubmit={(values) => {
          console.log(slots);
          if (!data) {
            setLoading(true);
            Photoshoots.postPhotoshootPeriods({
              title: values.title,
              type: submitType,
              time_from: submitStartTime,
              time_to: submitEndTime,
              first_choice_slots: slots.first_choice_slots,
              second_choice_slots: slots.second_choice_slots,
              third_choice_slots: slots.third_choice_slots,
              fourth_choice_slots: slots.fourth_choice_slots,
              group_slots: slots.groupSlots,
              start_date: format(dateRange[0], 'yyyy-MM-dd'),
              end_date: format(dateRange[1], 'yyyy-MM-dd'),
              first_choice: values.first_choice,
              second_choice: values.second_choice,
              third_choice: values.third_choice,
              fourth_choice: values.fourth_choice,
            })
              .then(() => {
                onExit();
                setLoading(false);
              })
              .catch((e) => {
                alert('Period name is empty or already exists.');
                setLoading(false);
              });
          }

          // data
          // ?
          //     Photoshoots.updatePhotoshootPeriods(data.id, {

          //     })
          // :
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <ModalCard>
              <ModalHeader>
                <ModalHeaderTitle>New Photoshoot Dates</ModalHeaderTitle>
                {/* <ModalHeaderActivation>
                                <ModalHeaderActivationText>Activate Enlistment</ModalHeaderActivationText>
                                <ToggleSwitch toggle={false} onChange={() => console.log("Switch button toggled!")}/>
                            </ModalHeaderActivation> */}
              </ModalHeader>
              {loading ? (
                <SlotLoading>
                  <h2>Creating slots...</h2>
                  <Spinner />
                </SlotLoading>
              ) : (
                <ModalBody>
                  <ModalBodyCol>
                    <ModalBodyRow>
                      <ModalBodyMarker></ModalBodyMarker>
                      {active || activeAddLater ? (
                        <Input
                          id='id_title'
                          name='title'
                          type='text'
                          value={values.title}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          className='modal__input'
                        />
                      ) : (
                        <ModalBodyHeader>{values.title}</ModalBodyHeader>
                      )}
                    </ModalBodyRow>
                    <ModalBodyRow>
                      <ModalBodyIcon src={invite}></ModalBodyIcon>
                      <ModalBodyText>{startDate}</ModalBodyText>
                      <ModalBodySubtitle>to</ModalBodySubtitle>
                      <ModalBodyText>{endDate}</ModalBodyText>
                    </ModalBodyRow>
                    <ModalBodyRow>
                      <ModalBodyIcon src={alarm}></ModalBodyIcon>
                      {addTimeInterval ? (
                        <TimeRange
                          startMoment={timeRange[0]}
                          endMoment={timeRange[1]}
                          startLabel=''
                          endLabel='to'
                          onStartTimeChange={(start) =>
                            setTimeRange([start.startTime, timeRange[1]])
                          }
                          onEndTimeChange={(end) =>
                            setTimeRange([timeRange[0], end.endTime])
                          }
                        />
                      ) : (
                        <>
                          <ModalBodyText>{startTime}</ModalBodyText>
                          <ModalBodySubtitle>to</ModalBodySubtitle>
                          <ModalBodyText>{endTime}</ModalBodyText>
                        </>
                      )}
                      {(active || activeAddLater) && !addTimeInterval ? (
                        <ModalBodyAction
                          onClick={() => setAddTimeInterval(!addTimeInterval)}
                        >
                          Add Interval
                        </ModalBodyAction>
                      ) : (
                        <></>
                      )}
                      {addTimeInterval ? (
                        <ModalBodyAction
                          onClick={() => setAddTimeInterval(!addTimeInterval)}
                        >
                          Save Interval
                        </ModalBodyAction>
                      ) : (
                        <></>
                      )}
                    </ModalBodyRow>
                    <ModalBodyRow>
                      <Calendar
                        selectRange={true}
                        returnValue='range'
                        onChange={(range) => setDateRange(range)}
                      />
                    </ModalBodyRow>
                    {/* {
                                            active || activeAddLater
                                            ?
                                                <ModalBodyRow>
                                                    <ModalBodyTotals>
                                                        <ModalBodyTotalHeader>Total Slots</ModalBodyTotalHeader>
                                                        <ModalBodyTotalContent>{settings && settings.total_slots}</ModalBodyTotalContent>
                                                    </ModalBodyTotals>
                                                    <ModalBodyTotals>
                                                        <ModalBodyTotalHeader>Slots per Hour</ModalBodyTotalHeader>
                                                        <ModalBodyTotalContent>{settings && settings.slots_per_hour}</ModalBodyTotalContent>
                                                    </ModalBodyTotals>
                                                    <ModalBodyTotals>
                                                        <ModalBodyTotalHeader>Slots per Day</ModalBodyTotalHeader>
                                                        <ModalBodyTotalContentBold>{settings && settings.slots_per_day}</ModalBodyTotalContentBold>
                                                    </ModalBodyTotals>
                                                </ModalBodyRow>
                                            :
                                                <>
                                                </>
                                        } */}
                  </ModalBodyCol>
                  <ModalBodyCol>
                    <Info>
                      <ModalBodyHeader>Add Enlistments</ModalBodyHeader>
                      <InfoText>Who are these photoshoot dates for?</InfoText>
                    </Info>
                    {!active ? (
                      <>
                        <ModalBodyRowStart onClick={individualHandler}>
                          <InfoIcon src={individual}></InfoIcon>
                          <Info>
                            <InfoLabel>Individuals</InfoLabel>
                            <InfoText>
                              Individual Photoshoots are solo portraits of the
                              graduating senior in a toga, business, and casual
                              attire.
                            </InfoText>
                          </Info>
                        </ModalBodyRowStart>
                        <ModalBodyRowStart onClick={groupHandler}>
                          <InfoIcon src={group}></InfoIcon>
                          <Info>
                            <InfoLabel>Groups</InfoLabel>
                            <InfoText>
                              Group photoshoots commonly focus on school
                              orgnizations, sports teams, and groups of friends.
                            </InfoText>
                          </Info>
                        </ModalBodyRowStart>
                        {/* { activeAddLater 
                                            ? 
                                                <ModalBodyRowStartActive onClick={addLaterHandler}>
                                                    <InfoIcon src={alarm_active}></InfoIcon>
                                                    <Info>
                                                        <InfoLabel>Add Later</InfoLabel>
                                                        <InfoText>Set up the enlistments at a later time.</InfoText>
                                                    </Info>
                                                </ModalBodyRowStartActive>
                                            :
                                                <ModalBodyRowStart onClick={addLaterHandler}>
                                                    <InfoIcon src={alarm}></InfoIcon>
                                                    <Info>
                                                        <InfoLabel>Add Later</InfoLabel>
                                                        <InfoText>Set up the enlistments at a later time.</InfoText>
                                                    </Info>
                                                </ModalBodyRowStart>
                                            } */}
                      </>
                    ) : (
                      <></>
                    )}
                    {activeIndividual ? (
                      <>
                        <ModalBodyRowStartActive onClick={individualHandler}>
                          <InfoIcon src={individual_active}></InfoIcon>
                          <Info>
                            <InfoLabel>Individuals</InfoLabel>
                            <InfoText>
                              Individual Photoshoots are solo portraits of the
                              graduating senior in a toga, business, and casual
                              attire.
                            </InfoText>
                          </Info>
                        </ModalBodyRowStartActive>
                        <Table>
                          <TableHeaderRow>
                            <TableHeader colSpan='3'>
                              Slots per Hour
                            </TableHeader>
                            {/* <TableHeader>Enlistment</TableHeader> */}
                          </TableHeaderRow>
                          <TableRow>
                            <TableCell colSpan='3'>
                              {/* <TableBodyTitle>Drab</TableBodyTitle> */}
                              <Select
                                defaultValue=""
                                onChange={(value) => {
                                  values.first_choice = value.value;
                                  console.log(values);
                                }}
                                label=''
                                options={schoolOptions}
                              />
                            </TableCell>
                            <TableCell colSpan='2'>
                              <TableCellInput>
                                <NumberButton
                                  src={minus}
                                  onClick={() =>
                                    setSlots({
                                      ...slots,
                                      first_choice_slots:
                                        slots.first_choice_slots - 1,
                                    })
                                  }
                                />
                                <NumberInput
                                  id='id_som_slots'
                                  name='somSlots'
                                  type='number'
                                  value={slots.first_choice_slots}
                                  onChange={(e) =>
                                    setSlots({
                                      ...slots,
                                      first_choice_slots: parseInt(
                                        e.target.value,
                                      ),
                                    })
                                  }
                                  onBlur={handleBlur}
                                />
                                <NumberButton
                                  src={plus}
                                  onClick={() =>
                                    setSlots({
                                      ...slots,
                                      first_choice_slots:
                                        slots.first_choice_slots + 1,
                                    })
                                  }
                                />
                              </TableCellInput>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan='3'>
                              {/* <TableBodyTitle>White</TableBodyTitle> */}
                              <Select
                                defaultValue=""
                                onChange={(value) => {
                                  values.second_choice = value.value;
                                  console.log(values);
                                }}
                                label=''
                                options={schoolOptions}
                              />
                            </TableCell>
                            <TableCell colSpan='2'>
                              <TableCellInput>
                                <NumberButton
                                  src={minus}
                                  onClick={() =>
                                    setSlots({
                                      ...slots,
                                      second_choice_slots:
                                        slots.second_choice_slots - 1,
                                    })
                                  }
                                />
                                <NumberInput
                                  id='id_soh_slots'
                                  name='sohSlots'
                                  type='number'
                                  value={slots.second_choice_slots}
                                  onChange={(e) =>
                                    setSlots({
                                      ...slots,
                                      second_choice_slots: parseInt(
                                        e.target.value,
                                      ),
                                    })
                                  }
                                  onBlur={handleBlur}
                                />
                                <NumberButton
                                  src={plus}
                                  onClick={() =>
                                    setSlots({
                                      ...slots,
                                      second_choice_slots:
                                        slots.second_choice_slots + 1,
                                    })
                                  }
                                />
                              </TableCellInput>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan='3'>
                              {/* <TableBodyTitle>Golden Yellow</TableBodyTitle> */}
                              <Select
                                defaultValue=""
                                onChange={(value) => {
                                  values.third_choice = value.value;
                                  console.log(values);
                                }}
                                label=''
                                options={schoolOptions}
                              />
                            </TableCell>
                            <TableCell colSpan='2'>
                              <TableCellInput>
                                <NumberButton
                                  src={minus}
                                  onClick={() =>
                                    setSlots({
                                      ...slots,
                                      third_choice_slots:
                                        slots.third_choice_slots - 1,
                                    })
                                  }
                                />
                                <NumberInput
                                  id='id_sose_slots'
                                  name='soseSlots'
                                  type='number'
                                  value={slots.third_choice_slots}
                                  onChange={(e) =>
                                    setSlots({
                                      ...slots,
                                      third_choice_slots: parseInt(
                                        e.target.value,
                                      ),
                                    })
                                  }
                                  onBlur={handleBlur}
                                />
                                <NumberButton
                                  src={plus}
                                  onClick={() =>
                                    setSlots({
                                      ...slots,
                                      third_choice_slots:
                                        slots.third_choice_slots + 1,
                                    })
                                  }
                                />
                              </TableCellInput>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan='3'>
                              {/* <TableBodyTitle>Orange</TableBodyTitle> */}
                              <Select
                                defaultValue=""
                                onChange={(value) => {
                                  values.fourth_choice = value.value;
                                  console.log(values);
                                }}
                                label=''
                                options={schoolOptions}
                              />
                            </TableCell>
                            <TableCell colSpan='2'>
                              <TableCellInput>
                                <TableCellInput>
                                  <NumberButton
                                    src={minus}
                                    onClick={() =>
                                      setSlots({
                                        ...slots,
                                        fourth_choice_slots:
                                          slots.fourth_choice_slots - 1,
                                      })
                                    }
                                  />
                                  <NumberInput
                                    id='id_soss_slots'
                                    name='sossSlots'
                                    type='number'
                                    value={slots.fourth_choice_slots}
                                    onChange={(e) =>
                                      setSlots({
                                        ...slots,
                                        fourth_choice_slots: parseInt(
                                          e.target.value,
                                        ),
                                      })
                                    }
                                    onBlur={handleBlur}
                                  />
                                  <NumberButton
                                    src={plus}
                                    onClick={() =>
                                      setSlots({
                                        ...slots,
                                        fourth_choice_slots:
                                          slots.fourth_choice_slots + 1,
                                      })
                                    }
                                  />
                                </TableCellInput>
                              </TableCellInput>
                            </TableCell>
                          </TableRow>
                        </Table>
                        <FFAContainer>
                          <FFADescription>
                            <FFATitle>Free for All</FFATitle>
                            <FFAText>
                              All graduating students, regardless of school, are
                              allowed to sign up. Free for all slot-takers will
                              sign up for leftover slots from set of photoshoot
                              dates.
                            </FFAText>
                          </FFADescription>
                          <FFAEnlistment>
                            {/* <DatePicker selected={selectedGroupDate} onChange={date => setSelectedGroupDate(date)} minDate={dateRange[0]} maxDate={dateRange[1]} customInput={<EnlistmentImg src={invite} />} />
                                                    <EnlistmentDate>{formattedGroupDate}</EnlistmentDate> */}
                          </FFAEnlistment>
                        </FFAContainer>
                      </>
                    ) : (
                      <></>
                    )}
                    {activeGroup ? (
                      <>
                        <ModalBodyRowStartActive onClick={groupHandler}>
                          <InfoIcon src={group_active}></InfoIcon>
                          <Info>
                            <InfoLabel>Groups</InfoLabel>
                            <InfoText>
                              Group photoshoots commonly focus on school
                              orgnizations, sports teams, and groups of friends.
                            </InfoText>
                          </Info>
                        </ModalBodyRowStartActive>
                        <Table>
                          <TableHeaderRow>
                            <TableHeader colSpan='3'>
                              Slots per Hour
                            </TableHeader>
                            <TableHeader>Enlistment</TableHeader>
                          </TableHeaderRow>
                          <TableRow>
                            <TableCell>
                              <TableBodyTitle>Groups</TableBodyTitle>
                            </TableCell>
                            <TableCell colSpan='2'>
                              <TableCellInput>
                                <NumberButton
                                  src={minus}
                                  onClick={() =>
                                    setSlots({
                                      ...slots,
                                      groupSlots: slots.groupSlots - 1,
                                    })
                                  }
                                />
                                <NumberInput
                                  id='id_group_slots'
                                  name='groupSlots'
                                  type='number'
                                  value={slots.groupSlots}
                                  onChange={(e) =>
                                    setSlots({
                                      ...slots,
                                      groupSlots: parseInt(e.target.value),
                                    })
                                  }
                                  onBlur={handleBlur}
                                />
                                <NumberButton
                                  src={plus}
                                  onClick={() =>
                                    setSlots({
                                      ...slots,
                                      groupSlots: slots.groupSlots + 1,
                                    })
                                  }
                                />
                              </TableCellInput>
                            </TableCell>
                          </TableRow>
                        </Table>
                      </>
                    ) : (
                      <></>
                    )}
                  </ModalBodyCol>
                </ModalBody>
              )}
              <ModalFooter>
                <ModalFooterContent>
                  <Button
                    type='button'
                    reverse={true}
                    label='Cancel'
                    onClick={onExit}
                  />
                  <Button
                    type='submit'
                    reverse={false}
                    label='Save Changes'
                    disabled={isSubmitting}
                  />
                </ModalFooterContent>
              </ModalFooter>
            </ModalCard>
          </form>
        )}
      </Formik>
    </ModalContainer>
  );
};

export default PhotoshootPeriod;
