import React, { useState } from 'react';
import { store } from "react-notifications-component";
import invite from './assets/invite.png';
import alarm from './assets/alarm.png';
import alarm_active from './assets/alarm_active.png';
import individual from './assets/individual.png';
import individual_active from './assets/individual_active.png';
import group from './assets/group.png';
import group_active from './assets/group_active.png';
import plus from './assets/plus.png';
import minus from './assets/minus.png';
import Input from "../Input";
import ToggleSwitch from '../../../../components/ToggleSwitch';
import Button from '../../../../components/Button';
import { format, parseISO } from "date-fns";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeRange from 'react-time-range';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useQuery } from 'react-query';
import { Photoshoots } from "../../../../services";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

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
    ModalFooterContent
} from './styles';

const photoshootPeriodSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    somSlots: Yup.number().integer(),
    sohSlots: Yup.number().integer(),
    soseSlots: Yup.number().integer(),
    sossSlots: Yup.number().integer(),
    groupSlots: Yup.number().integer(),
}) 

const PhotoshootPeriod = ({ periodId, data, settings, onExit }) => {
    const [submitType, setSubmitType] = useState(null);
    const [active, setActive] = useState(false);
    const [activeIndividual, setActiveIndividual] = useState(false);
    const [activeGroup, setActiveGroup] = useState(false);
    const [activeAddLater, setActiveAddLater] = useState(false);
    const [addTimeInterval, setAddTimeInterval] = useState(false);
    // const [active, setActive] = isActive ? useState(isActive) : useState(false);
    // const [activeIndividual, setActiveIndividual] = isIndividual ? useState(isIndividual) : useState(false);
    // const [activeGroup, setActiveGroup] = isGroup ? useState(isGroup) : useState(false);
    // const [activeAddLater, setActiveAddLater] = isAddLater ? useState(isAddLater) : useState(false);

    const { data: initial } = useQuery(
        'initial', 
        Photoshoots.getSinglePeriod(periodId),
    )
    
    const InitialValues = initial && initial ? {title: "Set Wow", somSlots: 3, soseSlots: 3, sohSlots: 3, sossSlots: 3, groupSlots: 12, } : { title: "Set n", somSlots: 3, sohSlots: 3, soseSlots: 3, sossSlots: 3, groupSlots: 12, }

    const [selectedSomDate, setSelectedSomDate] = useState(new Date());
    let submitSomDate = format(selectedSomDate, "yyyy-MM-dd")
    let formattedSomDate = format(selectedSomDate, "MMM d, yyyy");

    const [selectedSohDate, setSelectedSohDate] = useState(new Date());
    let submitSohDate = format(selectedSohDate, "yyyy-MM-dd")
    let formattedSohDate = format(selectedSohDate, "MMM d, yyyy");

    const [selectedSoseDate, setSelectedSoseDate] = useState(new Date());
    let submitSoseDate = format(selectedSoseDate, "yyyy-MM-dd")
    let formattedSoseDate = format(selectedSoseDate, "MMM d, yyyy");

    const [selectedSossDate, setSelectedSossDate] = useState(new Date());
    let submitSossDate = format(selectedSossDate, "yyyy-MM-dd")
    let formattedSossDate = format(selectedSossDate, "MMM d, yyyy");

    const [selectedGroupDate, setSelectedGroupDate] = useState(new Date());
    let submitGroupDate = format(selectedGroupDate, "yyyy-MM-dd")
    let formattedGroupDate = format(selectedGroupDate, "MMM d, yyyy");

    // const [isMaxSlots, setIsMaxSlots] = useState(false);
    // const date = format(parseISO(data.photoshoot), "MMMM dd, yyyy")
    // const time = format(parseISO(data.photoshoot), "HH:mm a")

    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    let startDate = format(dateRange[0], "MMM dd, yyyy");
    let endDate = format(dateRange[1], "MMM dd, yyyy");

    const [timeRange, setTimeRange] = useState(["2021-05-26T04:00:00.886Z", "2021-05-26T10:00:00.886Z"])
    let startTime = format(parseISO(timeRange[0]), "h:mm a");
    let endTime = format(parseISO(timeRange[1]), "h:mm a");
    let submitStartTime = format(parseISO(timeRange[0]), "HH:mm:ss")
    let submitEndTime = format(parseISO(timeRange[1]), "HH:mm:ss")

    const individualHandler = () => {
        setActive(!active);
        setActiveIndividual(!activeIndividual);
        setSubmitType("Individual");
    }

    const groupHandler = () => {
        setActive(!active);
        setActiveGroup(!activeGroup);
        setSubmitType("Group");
    }

    const addLaterHandler = () => {
        setActiveAddLater(!activeAddLater);
        setSubmitType("Add Later");
    }

    return (
        <ModalContainer>
            <Formik
                initialValues={InitialValues}
                validationSchema={photoshootPeriodSchema}
                onSubmit={values => {
                    data
                    ?
                        Photoshoots.updatePhotoshootPeriods(data.id, {
                            
                        })
                    :
                        Photoshoots.postPhotoshootPeriods({
                            title: values.title,
                            type: submitType,
                            time_from: submitStartTime,
                            time_to: submitEndTime,
                            som_day: submitSomDate,
                            soh_day: submitSohDate,
                            sose_day: submitSoseDate,
                            soss_day: submitSossDate,
                            group_day: submitGroupDate,
                            som_slots: values.somSlots,
                            soh_slots: values.sohSlots,
                            sose_slots: values.soseSlots,
                            soss_slots: values.sossSlots,
                            group_slots: values.groupSlots,
                        }).then({
                            onExit
                        })
                }}
            >
        {({ values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting, }) => (
                <form onSubmit={handleSubmit}>
                    <ModalCard>
                        <ModalHeader>
                            <ModalHeaderTitle>New Photoshoot Dates</ModalHeaderTitle>
                            <ModalHeaderActivation>
                                <ModalHeaderActivationText>Activate Enlistment</ModalHeaderActivationText>
                                <ToggleSwitch toggle={false} onChange={() => console.log("Switch button toggled!")}/>
                            </ModalHeaderActivation>
                        </ModalHeader>
                            <ModalBody>
                                <ModalBodyCol>
                                    <ModalBodyRow>
                                        <ModalBodyMarker></ModalBodyMarker>
                                        { 
                                            active || activeAddLater 
                                            ? 
                                                <Input id="id_title" name="title" type="text" value={values.title} handleChange={handleChange} handleBlur={handleBlur} className="modal__input" /> 
                                            : 
                                            <ModalBodyHeader>{values.title}</ModalBodyHeader>
                                        }
                                    </ModalBodyRow>
                                    <ModalBodyRow>
                                        <ModalBodyIcon src={invite}></ModalBodyIcon>
                                        <ModalBodyText>{startDate}</ModalBodyText>
                                        <ModalBodySubtitle>to</ModalBodySubtitle>
                                        <ModalBodyText>{endDate}</ModalBodyText>
                                    </ModalBodyRow>
                                    <ModalBodyRow>
                                        <ModalBodyIcon src={alarm}></ModalBodyIcon>
                                        { 
                                            addTimeInterval 
                                            ? 
                                                <TimeRange 
                                                    startMoment={timeRange[0]}
                                                    endMoment={timeRange[1]}
                                                    startLabel="" 
                                                    endLabel="to"
                                                    onStartTimeChange={(start) => setTimeRange([start.startTime, timeRange[1]])}
                                                    onEndTimeChange={(end) => setTimeRange([timeRange[0], end.endTime])} 
                                                /> 
                                            : 
                                            <>
                                                <ModalBodyText>{startTime}</ModalBodyText>
                                                <ModalBodySubtitle>to</ModalBodySubtitle>
                                                <ModalBodyText>{endTime}</ModalBodyText>
                                            </> 
                                        }
                                        { (active || activeAddLater) && !addTimeInterval ? <ModalBodyAction onClick={() => setAddTimeInterval(!addTimeInterval)}>Add Interval</ModalBodyAction> : <></> }
                                        { addTimeInterval ? <ModalBodyAction onClick={() => setAddTimeInterval(!addTimeInterval)}>Save Interval</ModalBodyAction> : <></> }
                                    </ModalBodyRow>
                                    <ModalBodyRow>
                                        <Calendar selectRange={true} returnValue="range" onChange={(range) => setDateRange(range)} />
                                    </ModalBodyRow>
                                        {
                                            active || activeAddLater
                                            ?
                                                <ModalBodyRow>
                                                    <ModalBodyTotals>
                                                        <ModalBodyTotalHeader>Total Slots</ModalBodyTotalHeader>
                                                        <ModalBodyTotalContent>{settings.total_slots}</ModalBodyTotalContent>
                                                    </ModalBodyTotals>
                                                    <ModalBodyTotals>
                                                        <ModalBodyTotalHeader>Slots per Hour</ModalBodyTotalHeader>
                                                        <ModalBodyTotalContent>{settings.slots_per_hour}</ModalBodyTotalContent>
                                                    </ModalBodyTotals>
                                                    <ModalBodyTotals>
                                                        <ModalBodyTotalHeader>Slots per Day</ModalBodyTotalHeader>
                                                        <ModalBodyTotalContentBold>{settings.slots_per_day}</ModalBodyTotalContentBold>
                                                    </ModalBodyTotals>
                                                </ModalBodyRow>
                                            :
                                                <>
                                                </>
                                        }
                                </ModalBodyCol>
                                <ModalBodyCol>
                                    <Info>
                                        <ModalBodyHeader>Add Enlistments</ModalBodyHeader>
                                        <InfoText>Who are these photoshoots dates for?</InfoText>
                                    </Info>
                                    {
                                        !active
                                        ?
                                        <>
                                            <ModalBodyRowStart onClick={individualHandler}>
                                                <InfoIcon src={individual}></InfoIcon>
                                                <Info>
                                                    <InfoLabel>Individuals</InfoLabel>
                                                    <InfoText>Individual Photoshoots are solo portraits of the graduating senior in a toga, business, and casual attire.</InfoText>
                                                </Info>
                                            </ModalBodyRowStart>
                                            <ModalBodyRowStart onClick={groupHandler}>
                                                <InfoIcon src={group}></InfoIcon>
                                                <Info>
                                                    <InfoLabel>Groups</InfoLabel>
                                                    <InfoText>Group photoshoots commonly focus on school orgnizations, sports teams, and groups of friends.</InfoText>
                                                </Info>
                                            </ModalBodyRowStart>
                                            { activeAddLater 
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
                                            }
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                    {
                                        activeIndividual
                                        ?
                                        <>
                                            <ModalBodyRowStartActive onClick={individualHandler}>
                                                <InfoIcon src={individual_active}></InfoIcon>
                                                <Info>
                                                    <InfoLabel>Individuals</InfoLabel>
                                                    <InfoText>Individual Photoshoots are solo portraits of the graduating senior in a toga, business, and casual attire.</InfoText>
                                                </Info>
                                            </ModalBodyRowStartActive>
                                            <Table>
                                                <TableHeaderRow>
                                                    <TableHeader colSpan="3">Slots per Hour</TableHeader>
                                                    <TableHeader>Enlistment</TableHeader>
                                                </TableHeaderRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <TableBodyTitle>SOM</TableBodyTitle>
                                                    </TableCell>
                                                    <TableCell colSpan="2">
                                                        <TableCellInput>
                                                            <NumberButton src={minus} onClick={() => values.somSlots = values.somSlots - 1 } />
                                                            <NumberInput id="id_som_slots" name="somSlots" type="number" value={values.somSlots} onChange={handleChange} onBlur={handleBlur} />
                                                            <NumberButton src={plus} onClick={() => values.somSlots = values.somSlots + 1} />
                                                        </TableCellInput>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TableCellEnlistment>
                                                            <DatePicker selected={selectedSomDate} onChange={date => setSelectedSomDate(date)} minDate={dateRange[0]} maxDate={dateRange[1]} customInput={<EnlistmentImg src={invite} />} />
                                                            <EnlistmentDate>{formattedSomDate}</EnlistmentDate>
                                                        </TableCellEnlistment>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <TableBodyTitle>SOH</TableBodyTitle>
                                                    </TableCell>
                                                    <TableCell colSpan="2">
                                                        <TableCellInput>
                                                            <NumberButton src={minus} onClick={() => values.sohSlots = values.sohSlots - 1 } />
                                                            <NumberInput id="id_soh_slots" name="sohSlots" type="number" value={values.sohSlots} onChange={handleChange} onBlur={handleBlur} />
                                                            <NumberButton src={plus} onClick={() => values.sohSlots = values.sohSlots + 1} />
                                                        </TableCellInput>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TableCellEnlistment>
                                                            <DatePicker selected={selectedSohDate} onChange={date => setSelectedSohDate(date)} minDate={dateRange[0]} maxDate={dateRange[1]} customInput={<EnlistmentImg src={invite} />} />
                                                            <EnlistmentDate>{formattedSohDate}</EnlistmentDate>
                                                        </TableCellEnlistment>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <TableBodyTitle>SOSE</TableBodyTitle>
                                                    </TableCell>
                                                    <TableCell colSpan="2">
                                                        <TableCellInput>
                                                        <NumberButton src={minus} onClick={() => values.soseSlots = values.soseSlots - 1 } />
                                                            <NumberInput id="id_sose_slots" name="soseSlots" type="number" value={values.soseSlots} onChange={handleChange} onBlur={handleBlur} />
                                                            <NumberButton src={plus} onClick={() => values.soseSlots = values.soseSlots + 1} />
                                                        </TableCellInput>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TableCellEnlistment>
                                                            <DatePicker selected={selectedSoseDate} onChange={date => setSelectedSoseDate(date)} minDate={dateRange[0]} maxDate={dateRange[1]} customInput={<EnlistmentImg src={invite} />} />
                                                            <EnlistmentDate>{formattedSoseDate}</EnlistmentDate>
                                                        </TableCellEnlistment>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <TableBodyTitle>SOSS</TableBodyTitle>
                                                    </TableCell>
                                                    <TableCell colSpan="2">
                                                        <TableCellInput>
                                                            <NumberButton src={minus} onClick={() => values.sossSlots = values.sossSlots - 1 } />
                                                            <NumberInput id="id_soss_slots" name="sossSlots" type="number" value={values.sossSlots} onChange={handleChange} onBlur={handleBlur} />
                                                            <NumberButton src={plus} onClick={() => values.sossSlots = values.sossSlots + 1} />
                                                        </TableCellInput>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TableCellEnlistment>
                                                            <DatePicker selected={selectedSossDate} onChange={date => setSelectedSossDate(date)} minDate={dateRange[0]} maxDate={dateRange[1]} customInput={<EnlistmentImg src={invite} />} />
                                                            <EnlistmentDate>{formattedSossDate}</EnlistmentDate>
                                                        </TableCellEnlistment>
                                                    </TableCell>
                                                </TableRow>
                                            </Table>
                                            <FFAContainer>
                                                <FFADescription>
                                                    <FFATitle>Free for All</FFATitle>
                                                    <FFAText>All graduating students, regardless of school, are allowed to sign up. Free for all slot-takers will sign up for leftover slots from set of photoshoot dates.</FFAText>
                                                </FFADescription>
                                                <FFAEnlistment>
                                                    <DatePicker selected={selectedGroupDate} onChange={date => setSelectedGroupDate(date)} minDate={dateRange[0]} maxDate={dateRange[1]} customInput={<EnlistmentImg src={invite} />} />
                                                    <EnlistmentDate>{formattedGroupDate}</EnlistmentDate>
                                                </FFAEnlistment>
                                            </FFAContainer>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                    {
                                        activeGroup
                                        ?
                                        <>
                                            <ModalBodyRowStartActive onClick={groupHandler}>
                                                <InfoIcon src={group_active}></InfoIcon>
                                                <Info>
                                                    <InfoLabel>Groups</InfoLabel>
                                                    <InfoText>Group photoshoots commonly focus on school orgnizations, sports teams, and groups of friends.</InfoText>
                                                </Info>
                                            </ModalBodyRowStartActive>
                                            <Table>
                                                <TableHeaderRow>
                                                    <TableHeader colSpan="3">Slots per Hour</TableHeader>
                                                    <TableHeader>Enlistment</TableHeader>
                                                </TableHeaderRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <TableBodyTitle>Groups</TableBodyTitle>
                                                    </TableCell>
                                                    <TableCell colSpan="2">
                                                        <TableCellInput>
                                                            <NumberButton src={minus} onClick={() => values.groupSlots = values.groupSlots - 1 } />
                                                            <NumberInput id="id_group_slots" name="groupSlots" type="number" value={values.groupSlots} onChange={handleChange} onBlur={handleBlur} />
                                                            <NumberButton src={plus} onClick={() => values.groupSlots = values.groupSlots + 1} />
                                                        </TableCellInput>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TableCellEnlistment>
                                                            <DatePicker selected={selectedGroupDate} onChange={date => setSelectedGroupDate(date)} minDate={dateRange[0]} maxDate={dateRange[1]} customInput={<EnlistmentImg src={invite} />} />
                                                            <EnlistmentDate>{formattedGroupDate}</EnlistmentDate>
                                                        </TableCellEnlistment>
                                                    </TableCell>
                                                </TableRow>
                                            </Table>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </ModalBodyCol>
                            </ModalBody>
                        <ModalFooter>
                            <ModalFooterContent>
                                <Button type="button" reverse={true} label="Cancel" onClick={onExit} />
                                <Button type="submit" reverse={false} label="Save Changes" disabled={isSubmitting} />
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