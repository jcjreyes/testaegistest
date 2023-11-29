import React, { useState } from 'react';
import { store } from "react-notifications-component";
import exit from './assets/exit.png';
import invite from './assets/invite.png';
import add from './assets/add.svg';
import Button from '../../../../components/Button';
import Spinner from "../../../../components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Input from '../Input';
import { format, parseISO } from "date-fns";

import {
    ModalContainer,
    ModalCard,
    ModalHeader,
    ModalHeaderTitle,
    ModalHeaderTitleMarker,
    ModalHeaderTitleText,
    ModalExit,
    ModalBody,
    ModalBodyCol,
    ModalBodyInfo,
    ModalBodyInfoCenter,
    ModalBodyInfoWrapper,
    ModalBodyInfoTitle,
    ModalBodyHeader,
    ModalBodySubtitle,
    EnlistmentContainer,
    EnlistmentImg,
    EnlistmentDate,
    EnlistmentAction,
    Info,
    InfoMarker,
    InfoLabel,
    InfoText,
    InfoSubtext,
    ModalFooter,
    ModalFooterContent,
} from './styles';
// import Chip from '../../../../components/Chip'

const ViewEnlistmentPeriod = ({ onExit, onAdd, data }) => {
    console.log(data)
    return (
        <ModalContainer>
        {/* <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                    errors.email = 'Required';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
                }}
        > */}
            <ModalCard>
                <ModalHeader>
                    <ModalHeaderTitle>
                        <ModalHeaderTitleMarker color="#EB5757" />
                        <ModalHeaderTitleText>SOM</ModalHeaderTitleText>
                    </ModalHeaderTitle>
                    <ModalExit src={exit} onClick={onExit} />
                </ModalHeader>
                    <ModalBody>
                        <ModalBodyCol>
                            <ModalBodyInfo>
                                <ModalBodyHeader>Enlistment Dates</ModalBodyHeader>
                            </ModalBodyInfo>
                                {
                                    data
                                    ?
                                        data.map((date) => {
                                            var formattedDate = format(parseISO(date.date), "MMM d, yyyy")
                                            var photoshootDates = date.periods
                                            return (
                                                <ModalBodyInfo>
                                                    <EnlistmentContainer>
                                                        <EnlistmentImg src={invite} />
                                                        <EnlistmentDate>{formattedDate}</EnlistmentDate>
                                                        <EnlistmentAction>Edit</EnlistmentAction>
                                                    </EnlistmentContainer>
                                                    <ModalBodyInfoCenter>
                                                        <ModalBodyInfoWrapper>
                                                            <ModalBodyInfoTitle>Photoshoot Dates</ModalBodyInfoTitle>
                                                            {
                                                                photoshootDates && photoshootDates.map((period) => {
                                                                    var earliest = format(parseISO(period.earliest), "MMM d, yyyy")
                                                                    var latest = format(parseISO(period.latest), "MMM d, yyyy")
                                                                    return (
                                                                        <Info>
                                                                            <InfoMarker />
                                                                            <InfoLabel>{period.title}</InfoLabel>
                                                                            <InfoText>{period.type}</InfoText>
                                                                            <InfoSubtext>{earliest} to {latest}</InfoSubtext>
                                                                        </Info>
                                                                    )
                                                                })
                                                            }
                                                        </ModalBodyInfoWrapper>
                                                    </ModalBodyInfoCenter>
                                                </ModalBodyInfo>   
                                            )
                                        })
                                    :
                                        <Spinner />
                                }
                        </ModalBodyCol>
                    </ModalBody>
                <ModalFooter>
                    <Button type="button" add={true} reverse={false} height="32px" width="100%" icon={add} onClick={onAdd} />
                </ModalFooter>
            </ModalCard>
        </ModalContainer>
        // </Formik>
    );
};

export default ViewEnlistmentPeriod;