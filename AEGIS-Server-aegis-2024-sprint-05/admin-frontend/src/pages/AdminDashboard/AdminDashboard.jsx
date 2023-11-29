import React, { useMemo, useState } from "react";
import Header from "../../components/Header";
// import Search from "../../components/Search";
import Photoshoot from "./components/Photoshoot";
import Standard from "./components/Standard";
import { format } from "date-fns";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import { useQuery } from "react-query";
import { Accounts } from "../../services";

import {
    Section,
    Container,
    HeaderWrapper,
    DateWrapper,
    DateCol,
    Today,
    Day,
    MonthYear,
    SearchWrapper,
    UpperRow,
    Row,
    SectionHeader,
} from "./styles"

const rescheduling = {
    "photoshoot_1": {},
    "photoshoot_2": {},
    "photoshoot_3": {},
    "photoshoot_4": {},
    "photoshoot_5": {},       
}

const Admin = () => {
    var today = new Date();
    var dayToday = format(today, "d");
    var monthYearToday = format(today, "MMMM y")
    const { data: user } = useQuery(
        'user', 
        Accounts.me,
    )

    return (
        <>
            <Section>
                <Header dashboard={true} user={user && user} />
            </Section>
            <Section>
                <Container>
                    <HeaderWrapper>
                        <DateWrapper>
                            <DateCol>
                                <Today>Today</Today>
                                <Day>{dayToday}</Day>
                            </DateCol>
                            <MonthYear>{monthYearToday}</MonthYear>
                        </DateWrapper>
                        {/* <SearchWrapper>
                            <Search placeholder="Search for an item..." />
                        </SearchWrapper> */}
                    </HeaderWrapper>
                    <UpperRow>
                        <Calendar className="with-shadow" />
                        <Photoshoot />
                        <Standard header="Photoshoot Rescheduling" data={rescheduling} link="rescheduling/" buttonLabel="See Requests" />
                    </UpperRow>
                    <HeaderWrapper>
                        <SectionHeader>Submissions</SectionHeader>
                        <hr />
                    </HeaderWrapper>
                    <Row>
                        <Standard header="Writeup Submissions" data={rescheduling} link="writeups/" buttonLabel="See Submissions" />
                        <Standard header="Yearbook Revisions" data={rescheduling} link="yearbook/" buttonLabel="See Submissions" />
                    </Row>
                </Container>
            </Section>
            {/* <EnlistmentExport /> */}
            {/* <PhotoshootInfo /> */}
            {/* <PhotoshootPeriod /> */}
            {/* <AddEnlistmentPeriod /> */}
            {/* <ViewEnlistmentPeriod /> */}
        </>
    )
}

export default Admin;