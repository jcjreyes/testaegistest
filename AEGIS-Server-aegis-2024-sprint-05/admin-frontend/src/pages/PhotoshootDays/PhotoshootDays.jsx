import React, { useState } from 'react';
import Header from "../../components/Header";
import Checkmark from "../../components/Checkmark";
import Search from "../../components/Search";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import Tag from "../../components/Tag";

import { useQuery } from 'react-query';
import { Photoshoots } from "../../services";

import { format, parseISO } from "date-fns";
import _ from "lodash";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import download from "./assets/download.svg"
import info from './assets/info.png';
import add from './assets/add.svg';
import left from "./assets/left.png"
import right from './assets/right.png';

import EnlistmentExport from "./components/EnlistmentExport";
import AddEnlistmentPeriod from "./components/AddEnlistmentPeriod";
import ViewEnlistmentPeriod from "./components/ViewEnlistmentPeriod";
import PhotoshootPeriod from "./components/PhotoshootPeriod";
import PhotoshootInfo from "./components/PhotoshootInfo";

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
} from "./styles"

const PhotoshootDays = () => {
    const [date, setDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    var formattedSelectedDate = format(selectedDate, "MMMM d, yyyy")
    var dayToday = format(date, "iii");
    var dateToday = format(date, "d");
    var monthYearToday = format(date, "MMMM y")
    var getDate = format(date, "yyyy-MM-dd")

    // Get Photoshoot Period Settings
    const { data: settings } = useQuery(
        'settings', 
        Photoshoots.getPhotoshootPeriodSettings,
    )

    // Get Photoshoot Periods
    const { data: periods } = useQuery(
        'periods', 
        Photoshoots.getPhotoshootPeriods,
    )

    // Get Enlistment Dates
    const { data: enlistment } = useQuery(
        'enlistment', 
        Photoshoots.getEnlistmentDates,
    )

    var _ = require('lodash');
    var groupedEnlistment = enlistment && _.groupBy(enlistment, date => date.group);

    // Get Photoshoot Datetimes
    const { data: datetimes } = useQuery(
        'datetimes', 
        Photoshoots.getPhotoshootDatetimes,
    )

    // Get Datetimes for selected date
    let selectedDatetimes = datetimes && datetimes.filter((time) => time.date.available_date === getDate)

    // Get Photoshoots
    const { data: photoshoots } = useQuery(
        'photoshoots', 
        Photoshoots.getPhotoshoots,
    )

    const [photoshootId, setPhotoshootId] = useState(null)
    const [periodId, setPeriodId] = useState(null)

    // Get Photoshoots for selected date
    const groupData = photoshoots && photoshoots.filter((photoshoot) => photoshoot.photoshoot_datetime.date.available_date === getDate && photoshoot.group_photoshoot != null)
    const somData = photoshoots && photoshoots.filter((photoshoot) => photoshoot.photoshoot_datetime.date.available_date === getDate && photoshoot.individual_photoshoot != null && photoshoot.individual_photoshoot.school === "SOM")
    const sohData = photoshoots && photoshoots.filter((photoshoot) => photoshoot.photoshoot_datetime.date.available_date === getDate && photoshoot.individual_photoshoot != null && photoshoot.individual_photoshoot.school === "SOH")
    const soseData = photoshoots && photoshoots.filter((photoshoot) => photoshoot.photoshoot_datetime.date.available_date === getDate && photoshoot.individual_photoshoot != null && photoshoot.individual_photoshoot.school === "SOSE")
    const sossData = photoshoots && photoshoots.filter((photoshoot) => photoshoot.photoshoot_datetime.date.available_date === getDate && photoshoot.individual_photoshoot != null && photoshoot.individual_photoshoot.school === "SOSS")

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
        if (group === "SOM") {
            return "#EB5757";
        } else if (group === "SOH") {
            return "#F2994A"
        } else if (group === "SOSE") {
            return "#6FCF97"
        } else {
            return "#2F80ED"
        }
    }

    const addOnViewEnlistmentHandler = () => {
        setActivateViewEnlistment(false);
        setActivateAddEnlistment(true);
    }

    const viewEnlistmentDataHandler = (group) => {
        var filteredData = enlistment && enlistment.filter((enlistment) => enlistment.group === group);
        setViewEnlistmentData(filteredData);
        viewEnlistmentData && setActivateViewEnlistment(!activateViewEnlistment);
    }

    const attendedHandler = (id, attended) => {
        Photoshoots.updatePhotoshootStatus(id, {
            attended: attended
        })
    }

    return (
        <>
            <Section>
                <Header dashboard={false} pageLabel="Photoshoot Dashboard" />
            </Section>
            <Section>
                <Container>
                    <Body>
                        <Column>
                            <SearchWrapper>
                                <Search placeholder="Search for an item..." />
                            </SearchWrapper>
                            <Calendar onChange={(value) => setSelectedDate(value)} />
                            <Row>
                                <DateWrapper>
                                    <DateCol>
                                        <Day className="muted">Selected Data</Day>
                                        <DayDate className="muted">{formattedSelectedDate}</DayDate>
                                    </DateCol>
                                </DateWrapper>
                                <Button reverse={true} icon={download} label="Export as CSV" onClick={() => setActivateExport(!activateExport)} />
                            </Row>
                            <Row>
                                <Title>Photoshoot Periods</Title>
                                {/* <Link onClick={() => setActivateViewEnlistment(!activateViewEnlistment)}>View All</Link> */}
                            </Row>
                            {periods && periods
                            ?
                                periods.map((period) => {
                                    var earliest = format(parseISO(period.earliest), "MMM d, yyyy")
                                    var latest = format(parseISO(period.latest), "MMM d, yyyy")
                                    return (
                                        <Info>
                                            <InfoMarker />
                                            <InfoLabel onClick={() => selectPeriodHandler(period.id)}>{period.title}</InfoLabel>
                                            <InfoText>{period.type}</InfoText>
                                            <InfoSubtext>{earliest === latest ? earliest : `${earliest} to ${latest}`}</InfoSubtext>
                                        </Info>
                                    )
                                })
                            :
                                <Spinner />
                            }
                            <Row>
                                <Button type="button" add={true} reverse={false} height="32px" width="100%" icon={add} onClick={selectPeriodHandler} />
                            </Row>
                            <Row>
                                <Title>Enlistment Dates</Title>
                            </Row>
                            {groupedEnlistment && groupedEnlistment
                            ?
                                <>
                                    {
                                        groupedEnlistment && groupedEnlistment.SOM
                                        ?
                                            <Info>
                                                <InfoMarker color={markerColorHandler("SOM")} />
                                                <InfoLabel onClick={() => viewEnlistmentDataHandler("SOM")}>SOM</InfoLabel>
                                                <InfoText className="normal">{format(parseISO(groupedEnlistment.SOM[0].date), "MMM d, yyyy")}</InfoText>
                                                {groupedEnlistment && Object.keys(groupedEnlistment.SOM).length - 1 > 0 ? <InfoSubtext className="lighter">and {Object.keys(groupedEnlistment.SOM).length - 1} other dates</InfoSubtext> : <></>}
                                            </Info>
                                        :
                                            <></>
                                    }
                                    {
                                        groupedEnlistment && groupedEnlistment.SOH
                                        ?
                                            <Info>
                                                <InfoMarker color={markerColorHandler("SOH")} />
                                                <InfoLabel onClick={() => viewEnlistmentDataHandler("SOH")}>SOH</InfoLabel>
                                                <InfoText className="normal">{format(parseISO(groupedEnlistment.SOH[0].date), "MMM d, yyyy")}</InfoText>
                                                {groupedEnlistment && Object.keys(groupedEnlistment.SOH).length - 1 > 0 ? <InfoSubtext className="lighter">and {Object.keys(groupedEnlistment.SOH).length - 1} other dates</InfoSubtext> : <></>}
                                            </Info>
                                        :
                                            <></>
                                    }
                                    {
                                        groupedEnlistment && groupedEnlistment.SOSE
                                        ?
                                            <Info>
                                                <InfoMarker color={markerColorHandler("SOSE")} />
                                                <InfoLabel onClick={() => viewEnlistmentDataHandler("SOSE")}>SOSE</InfoLabel>
                                                <InfoText className="normal">{format(parseISO(groupedEnlistment.SOSE[0].date), "MMM d, yyyy")}</InfoText>
                                                {groupedEnlistment && Object.keys(groupedEnlistment.SOSE).length - 1 > 0 ? <InfoSubtext className="lighter">and {Object.keys(groupedEnlistment.SOSE).length - 1} other dates</InfoSubtext> : <></>}
                                            </Info>
                                        :
                                            <></>
                                    }
                                    {
                                        groupedEnlistment && groupedEnlistment.SOSS
                                        ?
                                            <Info>
                                                <InfoMarker color={markerColorHandler("SOSS")} />
                                                <InfoLabel onClick={() => viewEnlistmentDataHandler("SOSS")}>SOSS</InfoLabel>
                                                <InfoText className="normal">{format(parseISO(groupedEnlistment.SOSS[0].date), "MMM d, yyyy")}</InfoText>
                                                {groupedEnlistment && Object.keys(groupedEnlistment.SOSS).length - 1 > 0 ? <InfoSubtext className="lighter">and {Object.keys(groupedEnlistment.SOSS).length - 1} other dates</InfoSubtext> : <></>}
                                            </Info>
                                        :
                                            <></>
                                    }
                                </>
                            :
                                <Spinner />
                            }
                            <Row>
                                <Button type="button" add={true} reverse={false} height="32px" width="100%" icon={add} onClick={() => setActivateAddEnlistment(!activateAddEnlistment)} />
                            </Row>
                        </Column>
                        <Column>
                            <ScheduleWrapper>
                                <ArrowButtons>
                                    <img src={left} onClick={() => { setDate(new Date(date.setDate(date.getDate() - 1))) }} />
                                    <img src={right} onClick={() => { setDate(new Date(date.setDate(date.getDate() + 1))) }} />
                                </ArrowButtons>
                                <Row className="schedule__header">
                                    <DateWrapper>
                                        <DateCol className="centered">
                                            <Day>{dayToday}</Day>
                                            <DayDate>{dateToday}</DayDate>
                                        </DateCol>
                                        <MonthYear>{monthYearToday}</MonthYear>
                                    </DateWrapper>
                                    <DateWrapper className="end">
                                        <DateCol className="end">
                                            <Day className="schedule__label">Slots</Day>
                                            <DayDate>24</DayDate>
                                        </DateCol>
                                    </DateWrapper>
                                </Row>
                            </ScheduleWrapper>
                            {
                                (datetimes && datetimes) && (selectedDatetimes && selectedDatetimes)
                                ?
                                !Array.isArray(selectedDatetimes) || !selectedDatetimes.length
                                ?
                                    <Row className="centered">
                                        <Title>No Scheduled Photoshoots...</Title>
                                    </Row>
                                :
                                    <ScheduleWrapper className="schedules">
                                        {selectedDatetimes.map((datetime) => {
                                            var timeList = String(datetime.time).split(":")
                                            var formattedTime = format(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), timeList[0], timeList[1], timeList[2]), "h:mm a")
                                            var groupPhotoshoots = groupData && groupData.filter((photoshoot) => photoshoot.photoshoot_datetime.time === datetime.time)
                                            var somPhotoshoots = somData && somData.filter((photoshoot) => photoshoot.photoshoot_datetime.time === datetime.time)
                                            var sohPhotoshoots = sohData && sohData.filter((photoshoot) => photoshoot.photoshoot_datetime.time === datetime.time)
                                            var sosePhotoshoots = soseData && soseData.filter((photoshoot) => photoshoot.photoshoot_datetime.time === datetime.time)
                                            var sossPhotoshoots = sossData && sossData.filter((photoshoot) => photoshoot.photoshoot_datetime.time === datetime.time)
                                            return (
                                                <>
                                                    { 
                                                    (groupPhotoshoots && groupPhotoshoots.length) || (somPhotoshoots && somPhotoshoots.length) || (sohPhotoshoots && sohPhotoshoots.length) || (sosePhotoshoots && sosePhotoshoots.length) || (sossPhotoshoots && sossPhotoshoots.length)     
                                                    ?
                                                        <>
                                                            <Row className="timeslot full__width">
                                                                <TimeSlot>
                                                                    <Time>{formattedTime}</Time>
                                                                </TimeSlot>
                                                                <hr className="lighter" />
                                                            </Row>
                                                            {
                                                                groupPhotoshoots && groupPhotoshoots.length
                                                                ?
                                                                <Row className="full__width">
                                                                    <TimeSlot>
                                                                        <HoverCard>
                                                                            <HoverCardText>GRPS</HoverCardText>
                                                                        </HoverCard>
                                                                    </TimeSlot>
                                                                    <ScheduleSlots>
                                                                        {groupPhotoshoots.map((photoshoot) => (
                                                                            <Schedule>
                                                                                <ScheduleTitle>{photoshoot.group_photoshoot.name}</ScheduleTitle>
                                                                                <ScheduleText>{photoshoot.group_photoshoot.emergency_contact_name}</ScheduleText>
                                                                                {photoshoot.group_photoshoot.group_type == "LIONS" ? <ScheduleTag /> : <ScheduleTag><Tag tag="Accredited" /></ScheduleTag>}
                                                                                <ScheduleInfo src={info} onClick={() => selectPhotoshootHandler(photoshoot.id)} />
                                                                                <ScheduleText className="attendance">Attendance</ScheduleText>
                                                                                <Checkmark checked={photoshoot.attended} onClick={() => attendedHandler(photoshoot.id, !photoshoot.attended)} />
                                                                            </Schedule>
                                                                        ))}
                                                                    </ScheduleSlots>
                                                                </Row>
                                                                :
                                                                <></>
                                                            }
                                                            {
                                                                somPhotoshoots && somPhotoshoots.length
                                                                ?
                                                                    <Row className="full__width">
                                                                        <TimeSlot>
                                                                            <HoverCard color="#EB5757">
                                                                                <HoverCardText>SOM</HoverCardText>
                                                                            </HoverCard>
                                                                        </TimeSlot>
                                                                        <ScheduleSlots>
                                                                            {somPhotoshoots.map((photoshoot) => (
                                                                                <Schedule>
                                                                                    <ScheduleTitle className="id__number">{photoshoot.individual_photoshoot.id_number}</ScheduleTitle>
                                                                                    <ScheduleText className="extend">{photoshoot.individual_photoshoot.name}</ScheduleText>
                                                                                    {photoshoot.is_scholar ? <ScheduleTag /> : <ScheduleTag><Tag tag="Scholar" /></ScheduleTag>}
                                                                                    <ScheduleInfo src={info} onClick={() => selectPhotoshootHandler(photoshoot.id)} />
                                                                                    <ScheduleText>Attendance</ScheduleText>
                                                                                    <Checkmark checked={photoshoot.attended} onChange={() => attendedHandler(photoshoot.id, !photoshoot.attended)} />
                                                                                </Schedule>
                                                                            ))}
                                                                        </ScheduleSlots>
                                                                    </Row>
                                                                :
                                                                    <></>
                                                            }
                                                            {
                                                                sohPhotoshoots && sohPhotoshoots.length
                                                                ?
                                                                <Row className="full__width">
                                                                    <TimeSlot>
                                                                        <HoverCard color="#F2994A">
                                                                            <HoverCardText>SOH</HoverCardText>
                                                                        </HoverCard>
                                                                    </TimeSlot>
                                                                    <ScheduleSlots>
                                                                        {sohPhotoshoots.map((photoshoot) => (
                                                                            <Schedule>
                                                                                <ScheduleTitle className="id__number">{photoshoot.individual_photoshoot.id_number}</ScheduleTitle>
                                                                                <ScheduleText className="extend">{photoshoot.individual_photoshoot.name}</ScheduleText>
                                                                                {photoshoot.is_scholar ? <ScheduleTag /> : <ScheduleTag><Tag tag="Scholar" /></ScheduleTag>}
                                                                                <ScheduleInfo src={info} onClick={() => selectPhotoshootHandler(photoshoot.id)} />
                                                                                <ScheduleText>Attendance</ScheduleText>
                                                                                <Checkmark checked={photoshoot.attended} onClick={() => attendedHandler(photoshoot.id, !photoshoot.attended)} />
                                                                            </Schedule>
                                                                        ))}
                                                                    </ScheduleSlots>
                                                                </Row>
                                                                :
                                                                <></>
                                                            }
                                                            {
                                                                sosePhotoshoots && sosePhotoshoots.length
                                                                ?
                                                                <Row className="full__width">
                                                                    <TimeSlot>
                                                                        <HoverCard color="#6FCF97">
                                                                            <HoverCardText>SOSE</HoverCardText>
                                                                        </HoverCard>
                                                                    </TimeSlot>
                                                                    <ScheduleSlots>
                                                                        {sosePhotoshoots.map((photoshoot) => (
                                                                            <Schedule>
                                                                                <ScheduleTitle className="id__number">{photoshoot.individual_photoshoot.id_number}</ScheduleTitle>
                                                                                <ScheduleText className="extend">{photoshoot.individual_photoshoot.name}</ScheduleText>
                                                                                {photoshoot.is_scholar ? <ScheduleTag /> : <ScheduleTag><Tag tag="Scholar" /></ScheduleTag>}
                                                                                <ScheduleInfo src={info} onClick={() => selectPhotoshootHandler(photoshoot.id)} />
                                                                                <ScheduleText>Attendance</ScheduleText>
                                                                                <Checkmark checked={photoshoot.attended} onClick={() => attendedHandler(photoshoot.id, !photoshoot.attended)} />
                                                                            </Schedule>
                                                                        ))}
                                                                    </ScheduleSlots>
                                                                </Row>
                                                                :
                                                                <></>
                                                            }
                                                            {
                                                                sossPhotoshoots && sossPhotoshoots.length
                                                                ?
                                                                <Row className="full__width">
                                                                    <TimeSlot>
                                                                        <HoverCard color="#2F80ED">
                                                                            <HoverCardText>SOSS</HoverCardText>
                                                                        </HoverCard>
                                                                    </TimeSlot>
                                                                    <ScheduleSlots>
                                                                        {sossPhotoshoots.map((photoshoot) => (
                                                                            <Schedule>
                                                                                <ScheduleTitle className="id__number">{photoshoot.individual_photoshoot.id_number}</ScheduleTitle>
                                                                                <ScheduleText className="extend">{photoshoot.individual_photoshoot.name}</ScheduleText>
                                                                                {photoshoot.is_scholar ? <ScheduleTag /> : <ScheduleTag><Tag tag="Scholar" /></ScheduleTag>}
                                                                                <ScheduleInfo src={info} onClick={() => selectPhotoshootHandler(photoshoot.id)} />
                                                                                <ScheduleText>Attendance</ScheduleText>
                                                                                <Checkmark checked={photoshoot.attended} onClick={() => attendedHandler(photoshoot.id, !photoshoot.attended)} />
                                                                            </Schedule>
                                                                        ))}
                                                                    </ScheduleSlots>
                                                                </Row>
                                                                :
                                                                <></>
                                                            }
                                                            <Row className="full__width add__button">
                                                                <TimeSlot></TimeSlot>
                                                                <Button type="button" add={true} reverse={false} height="32px" width="100%" icon={add} onClick={() => console.log("Add Changes!")} />
                                                            </Row>
                                                        </>
                                                    :
                                                        <>
                                                            <Row className="timeslot full__width">
                                                                <TimeSlot>
                                                                    <Time>{formattedTime}</Time>
                                                                </TimeSlot>
                                                                <hr className="lighter" />
                                                            </Row>
                                                            <Row className="centered">
                                                                <DayDate className="muted">No Scheduled Photoshoots...</DayDate>
                                                            </Row>
                                                        </>
                                                    }
                                                </>
                                            )
                                        })}
                                    </ScheduleWrapper>
                                :
                                    <Spinner />
                            }
                        </Column>
                    </Body>
                </Container>
            </Section>

            {/* Modals */}
            { activateExport ? <EnlistmentExport onExit={() => setActivateExport(!activateExport)} /> : <></> }
            { activateAddEnlistment ? <AddEnlistmentPeriod onExit={() => setActivateAddEnlistment(!activateAddEnlistment)} periods={periods && periods} /> : <></> }
            { activateViewEnlistment ? <ViewEnlistmentPeriod onExit={() => setActivateViewEnlistment(!activateViewEnlistment)} onAdd={addOnViewEnlistmentHandler} data={viewEnlistmentData && viewEnlistmentData} /> : <></> }
            { activateAddPeriod ? <PhotoshootPeriod periodId={periodId} settings={settings && settings[0]} onExit={() => setActivateAddPeriod(!activateAddPeriod)} /> : <></> }
            { activatePhotoshootInfo ? <PhotoshootInfo photoshoot={photoshootId} onExit={() => setActivatePhotoshootInfo(!activatePhotoshootInfo)} /> : <></> }
        </>
    )
}

export default PhotoshootDays;