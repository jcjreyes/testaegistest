import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Photoshoots } from "../../../../services";
import { store } from "react-notifications-component";

import exit from "./assets/exit.png";
import invite from "./assets/invite.png";
import Button from "../../../../components/Button";
import Checkbox from "../../../../components/Checkbox";
// import Input from '../Input';
import { format, parseISO } from "date-fns";

import chroma from "chroma-js";
import Select from "react-select";

import DatePicker from "react-datepicker";
import TimeRange from "react-time-range";
import "react-datepicker/dist/react-datepicker.css";

import {
    ModalContainer,
    ModalCard,
    ModalHeader,
    ModalHeaderTitle,
    ModalExit,
    ModalBody,
    ModalBodyCol,
    ModalBodyInfo,
    ModalBodyHeader,
    ModalBodyText,
    ModalBodyAction,
    ModalBodySubtitle,
    EnlistmentContainer,
    EnlistmentImg,
    EnlistmentDate,
    Info,
    InfoMarker,
    InfoLabel,
    InfoText,
    InfoSubtext,
    ModalFooter,
    ModalFooterContent,
} from "./styles";
// import Chip from '../../../../components/Chip'

const enlistmentPeriodSchema = Yup.object().shape({
    group: Yup.string().required("Title is Required"),
    date: Yup.date().required("Date is Required"),
    periods: Yup.array(),
});

const InitialValues = {
    group: "SOM",
    date: new Date(),
    periods: [],
};

let selectedPeriods = [];

const AddEnlistmentPeriod = ({ onExit, periods }) => {
    // Time ranges
    const [timeRange, setTimeRange] = useState([
        "2021-05-26T04:00:00.886Z",
        "2021-05-26T10:00:00.886Z",
    ]);
    const [addTimeInterval, setAddTimeInterval] = useState(false);
    let startTime = format(parseISO(timeRange[0]), "h:mm a");
    let endTime = format(parseISO(timeRange[1]), "h:mm a");
    let submitStartTime = format(parseISO(timeRange[0]), "HH:mm:ss");
    let submitEndTime = format(parseISO(timeRange[1]), "HH:mm:ss");

    const schoolOptions = [
        { value: "SOM", label: "Drab", color: "#E3AF7E" },
        { value: "SOH", label: "White", color: "#F9F6EE" },
        { value: "SOSE", label: "Golden Yellow", color: "#FDC848" },
        { value: "SOSS", label: "Orange", color: "#E55010" },
        { value: "FFA", label: "FFA", color: "dark gray" },
        { value: "AB AM", label: "AB AM", color: "#0F0F0F" },
        { value: "AB ChnS", label: "AB ChnS", color: "#0F0F0F" },
        { value: "AB COM", label: "AB COM", color: "#0F0F0F" },
        { value: "AB DS", label: "AB DS", color: "#0F0F0F" },
        { value: "AB DipIR", label: "AB DipIR", color: "#0F0F0F" },
        { value: "AB EC-H", label: "AB EC-H", color: "#0F0F0F" },
        { value: "AB EC", label: "AB EC", color: "#0F0F0F" },
        { value: "AB EU", label: "AB EU", color: "#0F0F0F" },
        { value: "AB HI", label: "AB HI", color: "#0F0F0F" },
        { value: "AB HUM", label: "AB HUM", color: "#0F0F0F" },
        { value: "AB IS", label: "AB IS", color: "#0F0F0F" },
        { value: "AB LIT ENG", label: "AB LIT ENG", color: "#0F0F0F" },
        { value: "AB LIT FIL", label: "AB LIT FIL", color: "#0F0F0F" },
        { value: "AB MEC", label: "AB MEC", color: "#0F0F0F" },
        { value: "AB PH", label: "AB PH", color: "#0F0F0F" },
        { value: "AB POS", label: "AB POS", color: "#0F0F0F" },
        { value: "AB PSY", label: "AB PSY", color: "#0F0F0F" },
        { value: "AB SOS", label: "AB SOS", color: "#0F0F0F" },
        { value: "AB SOCIO", label: "AB SOCIO", color: "#0F0F0F" },
        { value: "BFA AM", label: "BFA AM", color: "#0F0F0F" },
        { value: "BFA CW", label: "BFA CW", color: "#0F0F0F" },
        { value: "BFA ID", label: "BFA ID", color: "#0F0F0F" },
        { value: "BFA TA", label: "BFA TA", color: "#0F0F0F" },
        { value: "BS AMF", label: "BS AMF", color: "#0F0F0F" },
        { value: "BS AMDSc", label: "BS AMDSc", color: "#0F0F0F" },
        { value: "BS APS", label: "BS APS", color: "#0F0F0F" },
        { value: "BS MSE", label: "BS MSE", color: "#0F0F0F" },
        { value: "BS BIO", label: "BS BIO", color: "#0F0F0F" },
        { value: "BS CH", label: "BS CH", color: "#0F0F0F" },
        { value: "BS COMTECH", label: "BS COMTECH", color: "#0F0F0F" },
        { value: "BS CoE", label: "BS CoE", color: "#0F0F0F" },
        { value: "BS CS", label: "BS CS", color: "#0F0F0F" },
        { value: "BS DGDD", label: "BS DGDD", color: "#0F0F0F" },
        { value: "BS EcE", label: "BS EcE", color: "#0F0F0F" },
        { value: "BS ES", label: "BS ES", color: "#0F0F0F" },
        { value: "BS HS", label: "BS HS", color: "#0F0F0F" },
        { value: "BS ITE", label: "BS ITE", color: "#0F0F0F" },
        { value: "BS LM", label: "BS LM", color: "#0F0F0F" },
        { value: "BS LfSci", label: "BS LfSci", color: "#0F0F0F" },
        { value: "BS MGT", label: "BS MGT", color: "#0F0F0F" },
        { value: "BS MGTH", label: "BS MGT-H", color: "#0F0F0F" },
        { value: "BS ME", label: "BS ME", color: "#0F0F0F" },
        { value: "BS MIS", label: "BS MIS", color: "#0F0F0F" },
        { value: "BS MAC", label: "BS MAC", color: "#0F0F0F" },
        { value: "BS MA", label: "BS MA", color: "#0F0F0F" },
        { value: "BS PS", label: "BS PS", color: "#0F0F0F" },
        { value: "BS PSY", label: "BS PSY", color: "#0F0F0F" },
        { value: "BS RENT", label: "BS RENT", color: "#0F0F0F" },
    ];

    const dot = (color = "#ccc") => ({
        alignItems: "center",
        display: "flex",

        ":before": {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: "block",
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    const colourStyles = {
        option: (provided, state) => ({
            ...provided,
            "&:hover": {
                transition: "all 0.3s ease",
                backgroundColor: "#001196",
                color: "#FFF",
            },
            color: state.isSelected ? "#FFF" : "#333",
            backgroundColor: state.isSelected ? "#001196" : "#FFF",
            fontWeight: state.isSelected ? "600" : "400",
        }),
        control: (base, state) => ({
            ...base,
            "&:hover": {
                cursor: "pointer",
                border: "1.5px solid #BCBCBC",
            },
            border: state.isFocused
                ? "1.5px solid #BCBCBC"
                : "1.5px solid #C4C4C4",
            boxShadow: "none",
        }),
        container: () => ({
            position: "relative",
            width: 240,
        }),
        menu: () => ({
            position: "absolute",
            width: 240,
        }),
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    let submitDate = format(selectedDate, "yyyy-MM-dd");
    let formattedDate = format(selectedDate, "MMM d, yyyy");

    return (
        <ModalContainer>
            <Formik
                initialValues={InitialValues}
                validationSchema={enlistmentPeriodSchema}
                onSubmit={(values) => {
                    Photoshoots.postEnlistmentDates({
                        group: values.group,
                        date: submitDate,
                        period_ids: selectedPeriods,
                        time_from: submitStartTime,
                        time_to: submitEndTime,
                    })
                        .then(() => {
                            onExit();
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalCard>
                            <ModalHeader>
                                <ModalHeaderTitle>
                                    New Enlistment Dates
                                </ModalHeaderTitle>
                                <ModalExit src={exit} onClick={onExit} />
                            </ModalHeader>
                            <ModalBody>
                                <ModalBodyCol>
                                    <ModalBodyInfo>
                                        <ModalBodyHeader>
                                            Choose Enlistees
                                        </ModalBodyHeader>
                                        <ModalBodySubtitle>
                                            What kinds of individuals or groups
                                            will you allow to enlist?
                                        </ModalBodySubtitle>
                                        <Select
                                            defaultValue={schoolOptions.find(
                                                (school) =>
                                                    school.value == values.group
                                            )}
                                            onChange={(value) =>
                                                (values.group = value.value)
                                            }
                                            label=""
                                            options={schoolOptions}
                                            styles={colourStyles}
                                        />
                                    </ModalBodyInfo>
                                    <ModalBodyInfo>
                                        <ModalBodyHeader>
                                            Select Enlistment Date/s
                                        </ModalBodyHeader>
                                        <ModalBodySubtitle>
                                            When will they be able to enlist?
                                        </ModalBodySubtitle>
                                        <EnlistmentContainer>
                                            {/* <EnlistmentImg src={invite} /> */}
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) =>
                                                    setSelectedDate(date)
                                                }
                                                customInput={
                                                    <EnlistmentImg
                                                        src={invite}
                                                    />
                                                }
                                            />
                                            <EnlistmentDate>
                                                {formattedDate}
                                            </EnlistmentDate>
                                        </EnlistmentContainer>
                                    </ModalBodyInfo>
                                    <ModalBodyInfo>
                                        <ModalBodyHeader>
                                            Select Enlistment Time/s
                                        </ModalBodyHeader>
                                        <ModalBodySubtitle>
                                            What time will they be able to
                                            enlist?
                                        </ModalBodySubtitle>
                                        <EnlistmentContainer>
                                            {/* <EnlistmentImg
                                                src={alarm}
                                            ></EnlistmentImg> */}
                                            {addTimeInterval ? (
                                                <TimeRange
                                                    startMoment={timeRange[0]}
                                                    endMoment={timeRange[1]}
                                                    startLabel=""
                                                    endLabel="to"
                                                    onStartTimeChange={(
                                                        start
                                                    ) =>
                                                        setTimeRange([
                                                            start.startTime,
                                                            timeRange[1],
                                                        ])
                                                    }
                                                    onEndTimeChange={(end) =>
                                                        setTimeRange([
                                                            timeRange[0],
                                                            end.endTime,
                                                        ])
                                                    }
                                                />
                                            ) : (
                                                <>
                                                    <ModalBodyText>
                                                        {startTime} to {endTime}{" "}
                                                    </ModalBodyText>
                                                </>
                                            )}
                                            {!addTimeInterval ? (
                                                <ModalBodyAction
                                                    onClick={() =>
                                                        setAddTimeInterval(
                                                            !addTimeInterval
                                                        )
                                                    }
                                                >
                                                    Add Interval
                                                </ModalBodyAction>
                                            ) : (
                                                <></>
                                            )}

                                            {addTimeInterval ? (
                                                <ModalBodyAction
                                                    onClick={() =>
                                                        setAddTimeInterval(
                                                            !addTimeInterval
                                                        )
                                                    }
                                                >
                                                    Save Interval
                                                </ModalBodyAction>
                                            ) : (
                                                <></>
                                            )}
                                        </EnlistmentContainer>
                                    </ModalBodyInfo>
                                    <ModalBodyInfo>
                                        <ModalBodyHeader>
                                            Choose Photoshoot Period
                                        </ModalBodyHeader>
                                        <ModalBodySubtitle>
                                            What photoshoot dates will they be
                                            allowed to enlist for?
                                        </ModalBodySubtitle>
                                        {periods && periods ? (
                                            periods.map((period) => {
                                                var earliest = format(
                                                    parseISO(period.earliest),
                                                    "MMM d, yyyy"
                                                );
                                                var latest = format(
                                                    parseISO(period.latest),
                                                    "MMM d, yyyy"
                                                );
                                                return (
                                                    <Info>
                                                        <Checkbox
                                                            checked={false}
                                                            name="periods"
                                                            value={period.id}
                                                            onChange={(e) => {
                                                                e.target
                                                                    .checked ==
                                                                true ? (
                                                                    selectedPeriods.push(
                                                                        period.id
                                                                    )
                                                                ) : selectedPeriods.indexOf(
                                                                      period.id
                                                                  ) > -1 ? (
                                                                    selectedPeriods.splice(
                                                                        selectedPeriods.indexOf(
                                                                            period.id
                                                                        ),
                                                                        1
                                                                    )
                                                                ) : (
                                                                    <></>
                                                                );
                                                            }}
                                                        />
                                                        <InfoMarker />
                                                        <InfoLabel>
                                                            {period.title}
                                                        </InfoLabel>
                                                        <InfoText>
                                                            {period.type}
                                                        </InfoText>
                                                        <InfoSubtext>
                                                            {earliest} to{" "}
                                                            {latest}
                                                        </InfoSubtext>
                                                    </Info>
                                                );
                                            })
                                        ) : (
                                            <></>
                                        )}
                                    </ModalBodyInfo>
                                </ModalBodyCol>
                            </ModalBody>
                            <ModalFooter>
                                <ModalFooterContent>
                                    <Button
                                        type="button"
                                        reverse={true}
                                        label="Cancel"
                                        onClick={onExit}
                                    />
                                    {/* <Button type="submit" reverse={false} label="Save Changes" disabled={isSubmitting} onClick={onExit} /> */}
                                    <Button
                                        type="submit"
                                        reverse={false}
                                        label="Save Changes"
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

export default AddEnlistmentPeriod;
