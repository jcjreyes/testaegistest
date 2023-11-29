import React, { useState } from 'react';
import { store } from "react-notifications-component";
import exit from './assets/exit.png'
import Button from '../../../../components/Button';
import Tag from '../../../../components/Tag';
// import Input from '../Input';
import { format, parseISO } from "date-fns";

import {
    ModalContainer,
    IndividualModalCard,
    GroupModalCard,
    ModalExit,
    ModalHeader,
    ModalHeaderTitle,
    ModalHeaderSubtitle,
    ModalBody,
    ModalBodyRow,
    Info,
    GroupInfo,
    CardContentLabel,
    CardContentText,
    CardContentTextBold,
    ModalFooter,
    ModalFooterContent,
    Input
} from './styles';
// import Chip from '../../../../components/Chip'

const data = {
    "type": "Individual",
    "name": "Katrina Louise D. Santos",
    "id_number": "173845",
    "mobile_number": "09178057064",
    "tags": "Scholar",
    "email": "katrina.louise.santos@obf.ateneo.edu",
    "photoshoot": "2021-09-23T16:00:00.386Z",
}

const group_data = {
    "type": "Group",
    "name": "UXSociety Mafia",
    "main_contact": {
        "name": "Denise Quico",
        "mobile": "09178057064",
        "email": "denise.quico@obf.ateneo.edu",
    },
    "emergency_contact": {
        "name": "Katrina Santos",
        "mobile": "09951075698",
        "email": "katrina.louise.santos@obf.ateneo.edu",
    },
    "tags": "accredited",
    "photoshoot": "2021-09-23T16:00:00.386Z",
}

const PhotoshootInfo = ({ photoshoot, onExit }) => {
    const [allowInput, setAllowInput] = useState(false);
    console.log(photoshoot && photoshoot)
    const date = "Date"
    const time = "Time"
    // const date = format(parseISO(photoshoot.photoshoot), "MMMM dd, yyyy")
    // const time = format(parseISO(photoshoot.photoshoot), "HH:mm a")

    return (
        <ModalContainer>
            {photoshoot.type == "Individual"
            ? 
            // <Formik
            //         initialValues={{ email: '', password: '' }}
            //         validate={values => {
            //             const errors = {};
            //             if (!values.email) {
            //             errors.email = 'Required';
            //             } else if (
            //             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //             ) {
            //             errors.email = 'Invalid email address';
            //             }
            //             return errors;
            //         }}
            //         onSubmit={(values, { setSubmitting }) => {
            //             setTimeout(() => {
            //             alert(JSON.stringify(values, null, 2));
            //             setSubmitting(false);
            //             }, 400);
            //         }}
            // >
                <IndividualModalCard>
                    <ModalExit src={exit} onClick={onExit} />
                    <ModalHeader>
                        <ModalHeaderTitle>{data.name}</ModalHeaderTitle>
                    </ModalHeader>
                        <ModalBody>
                            <ModalBodyRow>
                                <Info>
                                    <CardContentLabel>ID Number</CardContentLabel>
                                    {allowInput ? <CardContentText>{data.id_number}</CardContentText> : <Input type="text" name="id_number" width="120px" maxlength="6" value={data.id_number} />}
                                </Info>
                                <Info>
                                    <CardContentLabel>Mobile</CardContentLabel>
                                    {allowInput ? <CardContentText>{data.mobile_number}</CardContentText> : <Input type="text" name="mobile_number" width="160px" maxlength="13" value={data.mobile_number} /> }
                                </Info>
                                <Info>
                                    <CardContentLabel>Tags</CardContentLabel>
                                    {allowInput ? <CardContentText>{data.tags}</CardContentText> : <Input type="text" name="tags" width="144px" value={data.tags} /> }
                                    {/* <CardContentText>{data.tags}</CardContentText> */}
                                </Info>
                            </ModalBodyRow>
                            <ModalBodyRow>
                                <Info>
                                    <CardContentLabel>Email Address</CardContentLabel>
                                    {allowInput ? <CardContentText>{data.email}</CardContentText> : <Input type="text" name="email" width="100%" value={data.email} /> }
                                </Info>
                            </ModalBodyRow>
                            <ModalBodyRow>
                                <Info>
                                    <CardContentLabel>Photoshoot</CardContentLabel>
                                    <CardContentTextBold>{date}</CardContentTextBold>
                                    <CardContentTextBold>{time}</CardContentTextBold>
                                </Info>
                            </ModalBodyRow>
                        </ModalBody>
                    <ModalFooter>
                        <ModalFooterContent>
                            <Button type="button" reverse={true} label="Delete" />
                            <Button type="button" reverse={false} label="Edit" onClick={() => setAllowInput(!allowInput)} />
                        </ModalFooterContent>
                    </ModalFooter>
                </IndividualModalCard>
            // </Formik>
            :
            <GroupModalCard>
                <ModalExit src={exit} onClick={onExit} />
                <ModalHeader>
                    <ModalHeaderTitle>{group_data.name}</ModalHeaderTitle>
                    <Tag id="0" tag={group_data.tags} />
                </ModalHeader>
                <ModalBody>
                    <ModalBodyRow>
                        <ModalHeaderSubtitle>Main Contact</ModalHeaderSubtitle>
                        <ModalHeaderSubtitle>Emergency Contact</ModalHeaderSubtitle>
                    </ModalBodyRow>
                    <ModalBodyRow>
                        <GroupInfo>
                            <CardContentLabel>Name</CardContentLabel>
                            {allowInput ? <CardContentText>{group_data.main_contact.name}</CardContentText> : <Input type="text" name="id_number" width="100%" maxlength="6" value={group_data.main_contact.name} />}
                        </GroupInfo>
                        <GroupInfo>
                            <CardContentLabel>Name</CardContentLabel>
                            {allowInput ? <CardContentText>{group_data.emergency_contact.name}</CardContentText> : <Input type="text" name="id_number" width="100%" maxlength="6" value={group_data.emergency_contact.name} />}
                        </GroupInfo>
                    </ModalBodyRow>
                    <ModalBodyRow>
                        <GroupInfo>
                            <CardContentLabel>Mobile Number</CardContentLabel>
                            {allowInput ? <CardContentText>{group_data.main_contact.mobile}</CardContentText> : <Input type="text" name="id_number" width="100%" maxlength="6" value={group_data.main_contact.mobile} />}
                        </GroupInfo>
                        <GroupInfo>
                            <CardContentLabel>Mobile Number</CardContentLabel>
                            {allowInput ? <CardContentText>{group_data.emergency_contact.mobile}</CardContentText> : <Input type="text" name="id_number" width="100%" maxlength="6" value={group_data.emergency_contact.mobile} />}
                        </GroupInfo>
                    </ModalBodyRow>
                    <ModalBodyRow>
                        <GroupInfo>
                            <CardContentLabel>Email Address</CardContentLabel>
                            {allowInput ? <CardContentText>{group_data.main_contact.email}</CardContentText> : <Input type="text" name="id_number" width="100%" maxlength="6" value={group_data.main_contact.email} />}
                        </GroupInfo>
                        <GroupInfo>
                            <CardContentLabel>Email Address</CardContentLabel>
                            {allowInput ? <CardContentText>{group_data.emergency_contact.email}</CardContentText> : <Input type="text" name="id_number" width="100%" maxlength="6" value={group_data.emergency_contact.email} />}
                        </GroupInfo>
                    </ModalBodyRow>
                    <ModalBodyRow>
                        <Info>
                            <CardContentLabel>Photoshoot</CardContentLabel>
                            <CardContentTextBold>{date}</CardContentTextBold>
                            <CardContentTextBold>{time}</CardContentTextBold>
                        </Info>
                    </ModalBodyRow>
                </ModalBody>
                <ModalFooter>
                    <ModalFooterContent>
                        <Button type="button" reverse={true} label="Delete" />
                        <Button type="button" reverse={false} label="Edit" onClick={() => setAllowInput(!allowInput)} />
                    </ModalFooterContent>
                </ModalFooter>
            </GroupModalCard>
            }
        </ModalContainer>
    )
};

export default PhotoshootInfo;