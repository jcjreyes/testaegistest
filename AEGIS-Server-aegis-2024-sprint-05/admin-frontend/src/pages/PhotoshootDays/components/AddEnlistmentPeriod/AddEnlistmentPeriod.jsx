import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Photoshoots } from "../../../../services";
import { store } from "react-notifications-component";

import exit from './assets/exit.png';
import invite from './assets/invite.png';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
// import Input from '../Input';
import { format, parseISO } from "date-fns";

import chroma from 'chroma-js';
import Select from 'react-select';

import DatePicker from "react-datepicker";
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
    ModalFooterContent
} from './styles';
// import Chip from '../../../../components/Chip'

const enlistmentPeriodSchema = Yup.object().shape({
    group: Yup.string().required("Title is Required"),
    date: Yup.date().required("Date is Required"),
    periods: Yup.array(),
}) 

const InitialValues = {
    group: 'SOM',
    date: new Date(),
    periods: [],
}

let selectedPeriods = []

const AddEnlistmentPeriod = ({ onExit, periods }) => {    
    const schoolOptions = [
        {value: 'SOM', label: "SOM", color: "#EB5757"},
        {value: 'SOH', label: "SOH", color: "#F2994A"},
        {value: 'SOSE', label: "SOSE", color: "#6FCF97"},
        {value: 'SOSS', label: "SOSS", color: "#2F80ED"},
    ]

    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',
      
        ':before': {
          backgroundColor: color,
          borderRadius: 10,
          content: '" "',
          display: 'block',
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
                color: "#FFF"
            },
            color: state.isSelected ? "#FFF" : "#333",
            backgroundColor: state.isSelected ? "#001196" : "#FFF",
            fontWeight: state.isSelected ? "600" : "400",
        }),
        control: (base, state) => ({
            ...base,
            "&:hover": {
                cursor: 'pointer',
                border: "1.5px solid #BCBCBC",
            },
            border: state.isFocused ? '1.5px solid #BCBCBC' : '1.5px solid #C4C4C4',
            boxShadow: 'none',
        }),
        container: () => ({
            position: "relative",
            width: 240,
        }),
        menu: () => ({
            position: "absolute",
            width: 240,
        }),
        input: styles => ({ ...styles, ...dot() }),
        placeholder: styles => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    let submitDate = format(selectedDate, "yyyy-MM-dd")
    let formattedDate = format(selectedDate, "MMM d, yyyy")

    return (
        <ModalContainer>
            <Formik
                    initialValues={InitialValues}
                    validationSchema={enlistmentPeriodSchema}
                    onSubmit={values => {
                        Photoshoots.postEnlistmentDates({
                            group: values.group,
                            date: submitDate,
                            period_ids: selectedPeriods,
                        });
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
                                <ModalHeaderTitle>New Enlistment Dates</ModalHeaderTitle>
                                <ModalExit src={exit} onClick={onExit} />
                            </ModalHeader>
                                <ModalBody>
                                    <ModalBodyCol>
                                        <ModalBodyInfo>
                                            <ModalBodyHeader>Choose Enlistees</ModalBodyHeader>
                                            <ModalBodySubtitle>What kinds of individuals or groups will you allow to enlist?</ModalBodySubtitle>
                                            <Select 
                                                defaultValue={schoolOptions.find((school) => school.value == values.group)}
                                                onChange={(value) => values.group = value.value}
                                                label=""
                                                options={schoolOptions}
                                                styles={colourStyles}
                                            />
                                        </ModalBodyInfo>
                                        <ModalBodyInfo>
                                            <ModalBodyHeader>Select Enlistment Date/s</ModalBodyHeader>
                                            <ModalBodySubtitle>When will they be able to enlist?</ModalBodySubtitle>
                                            <EnlistmentContainer>
                                                {/* <EnlistmentImg src={invite} /> */}
                                                <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} customInput={<EnlistmentImg src={invite} />} />
                                                <EnlistmentDate>{formattedDate}</EnlistmentDate>
                                            </EnlistmentContainer>
                                        </ModalBodyInfo>
                                        <ModalBodyInfo>
                                            <ModalBodyHeader>Choose Photoshoot Period</ModalBodyHeader>
                                            <ModalBodySubtitle>What photoshoot dates will they be allowed to enlist for?</ModalBodySubtitle>
                                            {
                                                periods && periods
                                                ?
                                                    periods.map((period) => {
                                                        var earliest = format(parseISO(period.earliest), "MMM d, yyyy")
                                                        var latest = format(parseISO(period.latest), "MMM d, yyyy")
                                                        return (
                                                            <Info>
                                                                <Checkbox 
                                                                    checked={false}
                                                                    name="periods"
                                                                    value={period.id}
                                                                    onChange={(e) => {
                                                                        e.target.checked == true
                                                                        ?
                                                                            selectedPeriods.push(period.id)
                                                                        :
                                                                            selectedPeriods.indexOf(period.id) > -1
                                                                            ?
                                                                                selectedPeriods.splice(selectedPeriods.indexOf(period.id), 1)
                                                                            :
                                                                            <></>
                                                                    }}
                                                                />
                                                                <InfoMarker />
                                                                <InfoLabel>{period.title}</InfoLabel>
                                                                <InfoText>{period.type}</InfoText>
                                                                <InfoSubtext>{earliest} to {latest}</InfoSubtext>
                                                            </Info>
                                                        )
                                                    })
                                                :
                                                <></>
                                            }
                                        </ModalBodyInfo>
                                    </ModalBodyCol>
                                </ModalBody>
                            <ModalFooter>
                                <ModalFooterContent>
                                    <Button type="button" reverse={true} label="Cancel" onClick={onExit} />
                                    {/* <Button type="submit" reverse={false} label="Save Changes" disabled={isSubmitting} onClick={onExit} /> */}
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

export default AddEnlistmentPeriod;