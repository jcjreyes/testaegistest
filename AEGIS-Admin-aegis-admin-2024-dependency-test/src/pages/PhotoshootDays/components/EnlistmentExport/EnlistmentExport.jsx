import React from 'react';
import { Formik, Form } from "formik";
import { store } from "react-notifications-component";
import exit from './assets/exit.png'
import Button from '../../../../components/Button';
import Input from '../Input';
import { format } from "date-fns";

import {
    ModalContainer,
    ModalCard,
    ModalExit,
    ModalHeader,
    ModalHeaderTitle,
    ModalHeaderSubtitle,
    ModalBody,
    ModalFooter,
    ModalFooterContent,
} from './styles';
// import Chip from '../../../../components/Chip'

const EnlistmentExport = ({ onExit }) => {
    return (
        <ModalContainer>
            <ModalCard>
                <ModalExit src={exit} onClick={onExit} />
                <ModalHeader>
                    <ModalHeaderTitle>Export as CSV</ModalHeaderTitle>
                    <ModalHeaderSubtitle>1,000 results for Selected Data</ModalHeaderSubtitle>
                </ModalHeader>
                <Formik 
                    initialValues={{date: format(new Date(), "MMMM d, y"), rows: 1000}}
                    onSubmit={async (values, bag) => {
                        try {
                            const resp = await EnlistmentExport({
                                date: values.date,
                                rows: values.rows,
                            })
                        } catch (error) {
                            Object.keys(error.response.data).map(el => {
                                let message = ''
                                error.response.data[el].forEach(
                                    el => (message += `${el}\n`)
                                )
                                store.addNotification({
                                    title: 'Error!',
                                    message: 'Please try again.',
                                    type: 'danger',
                                    insert: 'bottom',
                                    container: 'top-right',
                                    animationIn: ['animated', 'fadeIn'],
                                    animationOut: ['animated', 'fadeOut'],
                                    dismiss: {
                                        duration: 5000,
                                        onScreen: true,
                                    },
                                })
                                bag.resetForm()
                            })
                        }
                    }}
                >
                {formik => {
                    return (
                        <ModalBody>
                            <Input label="DATE" type="text" name="date" required={false} forceUseMeta={true} />
                            <Input label="NUMBER OF ROWS" type="number" name="rows" required={false} forceUseMeta={true} />
                        </ModalBody>
                    )}
                }
                </Formik>
                <ModalFooter>
                    <ModalFooterContent>
                        <Button type="button" reverse={true} label="Cancel" onClick={onExit} />
                        <Button type="button" reverse={false} label="Export as CSV" />
                    </ModalFooterContent>
                </ModalFooter>
            </ModalCard>
        </ModalContainer>
    )
};

export default EnlistmentExport;