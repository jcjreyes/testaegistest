import React, { useEffect, useState } from "react";
import exit from "./assets/exit.png";
import Button from "../../../../components/Button";
import Tag from "../../../../components/Tag";
import { Photoshoots } from "../../../../services/Photoshoots";

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
    Input,
} from "./styles";

const PhotoshootInfo = ({
    photoshoot,
    photoshoots,
    setPhotoshoots,
    onExit,
    selectedDatetimes,
    setSelectedDatetimes,
}) => {
    // const [allowInput, setAllowInput] = useState(false);
    const [photoshootInstance, setPhotoshootInstance] = useState();

    // useEffect(() => {
    //     Photoshoots.getPhotoshoots().then((data) => setPhotoshoots(data));
    // }, []);

    // Get the photoshoot instance
    useEffect(() => {
        const instance = photoshoots.find((ps) => ps.id === photoshoot);
        setPhotoshootInstance(instance);
    }, [photoshoots]);

    const deletePhotoshootHandler = (id) => {
        // delete function
        Photoshoots.deletePhotoshoot(id).then((data) => {
            // Add one slot
            const deletedPs = photoshoots.find((ps) => id === ps?.id);
            const adjustSlot = selectedDatetimes.map((datetime) =>
                datetime?.id === deletedPs?.photoshoot_datetime?.id
                    ? { ...datetime, slots: datetime.slots + 1 }
                    : datetime
            );
            setSelectedDatetimes(adjustSlot);

            // Filter photoshoot out
            const postDelete = photoshoots.filter((ps) => id !== ps?.id);
            setPhotoshoots(postDelete);

            onExit();
        });
    };

    return (
        <ModalContainer>
            {photoshootInstance && photoshootInstance.individual_photoshoot ? (
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
                        <ModalHeaderTitle>
                            {photoshootInstance.individual_photoshoot.name}
                        </ModalHeaderTitle>
                    </ModalHeader>
                    <ModalBody>
                        <ModalBodyRow>
                            <Info>
                                <CardContentLabel>ID Number</CardContentLabel>
                                <CardContentText>
                                    {
                                        photoshootInstance.individual_photoshoot
                                            .id_number
                                    }
                                </CardContentText>
                                {/* {allowInput ? <CardContentText>{photoshootInstance.individual_photoshoot.id_number}</CardContentText> : <Input type="text" name="id_number" width="120px" maxlength="6" value={photoshootInstance.individual_photoshoot.id_number} />} */}
                            </Info>
                            <Info>
                                <CardContentLabel>Mobile</CardContentLabel>
                                <CardContentText>
                                    {photoshootInstance.user_phone}
                                </CardContentText>
                                {/* {allowInput ? <CardContentText>{data.mobile_number}</CardContentText> : <Input type="text" name="mobile_number" width="160px" maxlength="13" value={photoshootInstance.individual_photoshoot.mobile_number} /> } */}
                            </Info>
                            
                            {/* <Info>
                                    <CardContentLabel>Tags</CardContentLabel>
                                    {allowInput ? <CardContentText>{data.tags}</CardContentText> : <Input type="text" name="tags" width="144px" value={data.tags} /> } */}
                            {/* <CardContentText>{data.tags}</CardContentText> */}
                            {/* </Info> */}
                        </ModalBodyRow>
                        <ModalBodyRow>
                            <Info>
                                <CardContentLabel>
                                    Email Address
                                </CardContentLabel>
                                <CardContentText>
                                    {
                                        photoshootInstance.individual_photoshoot
                                            .email
                                    }
                                </CardContentText>
                            </Info>
                        </ModalBodyRow>
                        <ModalBodyRow>
                            <Info>
                                <CardContentLabel>
                                    Reference Number
                                </CardContentLabel>
                                <CardContentText>
                                    {photoshootInstance.reference_id}
                                </CardContentText>
                            </Info>
                            <Info>
                                <CardContentLabel>
                                    Avail Makeup
                                </CardContentLabel>
                                <CardContentText>
                                    {photoshootInstance.will_makeup ? "Yes" : "No"}
                                </CardContentText>
                            </Info>
                        </ModalBodyRow>
                        <hr />
                        <ModalBodyRow>
                            <Info>
                                <CardContentLabel>Photoshoot</CardContentLabel>
                                <CardContentTextBold>
                                    Date:{" "}
                                    {
                                        photoshootInstance.photoshoot_datetime
                                            .date.available_date
                                    }
                                </CardContentTextBold>
                                <CardContentTextBold>
                                    {console.log(photoshootInstance)}
                                    Time:{" "}
                                    {
                                        photoshootInstance.photoshoot_datetime
                                            .time
                                    }
                                </CardContentTextBold>
                            </Info>
                        </ModalBodyRow>
                    </ModalBody>
                    <ModalFooter>
                        <ModalFooterContent>
                            <Button
                                type="button"
                                reverse={true}
                                label="Delete"
                                onClick={() =>
                                    deletePhotoshootHandler(photoshoot)
                                }
                            />
                            {/* <Button
                                type="button"
                                reverse={false}
                                label="Edit"
                                onClick={() => setAllowInput(!allowInput)}
                            /> */}
                        </ModalFooterContent>
                    </ModalFooter>
                </IndividualModalCard>
            ) : null}

            {photoshootInstance && photoshootInstance.group_photoshoot ? (
                // </Formik>
                <GroupModalCard>
                    <ModalExit src={exit} onClick={onExit} />
                    <ModalHeader>
                        <ModalHeaderTitle>
                            {photoshootInstance.group_photoshoot.name}
                        </ModalHeaderTitle>
                        <Tag
                            id="0"
                            tag={photoshootInstance.group_photoshoot.subgroup}
                        />
                    </ModalHeader>
                    <ModalBody>
                        <ModalBodyRow>
                            <ModalHeaderSubtitle>
                                Main Contact
                            </ModalHeaderSubtitle>
                            <ModalHeaderSubtitle>
                                Emergency Contact
                            </ModalHeaderSubtitle>
                        </ModalBodyRow>
                        <ModalBodyRow>
                            <GroupInfo>
                                <CardContentLabel>Name</CardContentLabel>
                                <CardContentText>
                                    {photoshootInstance.user_first}{" "}
                                    {photoshootInstance.user_last}
                                </CardContentText>
                                {/* {allowInput ? (
                                    <CardContentText>
                                        {group_data.main_contact.name}
                                    </CardContentText>
                                ) : (
                                    <Input
                                        type="text"
                                        name="id_number"
                                        width="100%"
                                        maxlength="6"
                                        value={group_data.main_contact.name}
                                    />
                                )} */}
                            </GroupInfo>
                            <GroupInfo>
                                <CardContentLabel>Name</CardContentLabel>
                                <CardContentText>
                                    {
                                        photoshootInstance.group_photoshoot
                                            .emergency_contact_name
                                    }
                                </CardContentText>
                                {/* {allowInput ? (
                                    <CardContentText>
                                        {
                                            photoshootInstance.group_photoshoot
                                                .emergency_contact_name
                                        }
                                    </CardContentText>
                                ) : (
                                    <Input
                                        type="text"
                                        name="id_number"
                                        width="100%"
                                        maxlength="6"
                                        value={
                                            group_data.emergency_contact.name
                                        }
                                    />
                                )} */}
                            </GroupInfo>
                        </ModalBodyRow>
                        <ModalBodyRow>
                            <GroupInfo>
                                <CardContentLabel>
                                    Mobile Number
                                </CardContentLabel>
                                <CardContentText>
                                    {photoshootInstance.user_phone}
                                </CardContentText>
                                {/* {allowInput ? (
                                    <CardContentText>
                                        {group_data.main_contact.mobile}
                                    </CardContentText>
                                ) : (
                                    <Input
                                        type="text"
                                        name="id_number"
                                        width="100%"
                                        maxlength="6"
                                        value={group_data.main_contact.mobile}
                                    />
                                )} */}
                            </GroupInfo>
                            <GroupInfo>
                                <CardContentLabel>
                                    Mobile Number
                                </CardContentLabel>
                                <CardContentText>
                                    {
                                        photoshootInstance.group_photoshoot
                                            .emergency_contact_number
                                    }
                                </CardContentText>
                                {/* {allowInput ? (
                                    <CardContentText>
                                        {group_data.emergency_contact.mobile}
                                    </CardContentText>
                                ) : (
                                    <Input
                                        type="text"
                                        name="id_number"
                                        width="100%"
                                        maxlength="6"
                                        value={
                                            group_data.emergency_contact.mobile
                                        }
                                    />
                                )} */}
                            </GroupInfo>
                        </ModalBodyRow>
                        <ModalBodyRow>
                            <GroupInfo>
                                <CardContentLabel>
                                    Email Address
                                </CardContentLabel>
                                <CardContentText>
                                    {photoshootInstance.user_email}
                                </CardContentText>
                                {/* {allowInput ? (
                                    <CardContentText>
                                        {group_data.main_contact.email}
                                    </CardContentText>
                                ) : (
                                    <Input
                                        type="text"
                                        name="id_number"
                                        width="100%"
                                        maxlength="6"
                                        value={group_data.main_contact.email}
                                    />
                                )} */}
                            </GroupInfo>
                            <GroupInfo>
                                <CardContentLabel>
                                    Email Address
                                </CardContentLabel>
                                <CardContentText>
                                    {
                                        photoshootInstance.group_photoshoot
                                            .emergency_contact_email
                                    }
                                </CardContentText>
                                {/* {allowInput ? (
                                    <CardContentText>
                                        {group_data.emergency_contact.email}
                                    </CardContentText>
                                ) : (
                                    <Input
                                        type="text"
                                        name="id_number"
                                        width="100%"
                                        maxlength="6"
                                        value={
                                            group_data.emergency_contact.email
                                        }
                                    />
                                )} */}
                            </GroupInfo>
                        </ModalBodyRow>
                        <ModalBodyRow>
                            <Info>
                                <CardContentLabel>Photoshoot</CardContentLabel>
                                <CardContentTextBold>
                                    Date:{" "}
                                    {
                                        photoshootInstance.photoshoot_datetime
                                            .date.available_date
                                    }
                                </CardContentTextBold>
                                <CardContentTextBold>
                                    Time:{" "}
                                    {
                                        photoshootInstance.photoshoot_datetime
                                            .time
                                    }
                                </CardContentTextBold>
                            </Info>
                            <Info>
                                <CardContentLabel>
                                    Reference Number
                                </CardContentLabel>
                                <CardContentText>
                                    {photoshootInstance.reference_id}
                                </CardContentText>
                            </Info>
                        </ModalBodyRow>
                    </ModalBody>
                    <ModalFooter>
                        <ModalFooterContent>
                            <Button
                                type="button"
                                reverse={true}
                                label="Delete"
                                onClick={() =>
                                    deletePhotoshootHandler(photoshoot)
                                }
                            />
                            {/* <Button
                                type="button"
                                reverse={false}
                                label="Edit"
                                onClick={() => setAllowInput(!allowInput)}
                            /> */}
                        </ModalFooterContent>
                    </ModalFooter>
                </GroupModalCard>
            ) : null}
        </ModalContainer>
    );
};

export default PhotoshootInfo;
