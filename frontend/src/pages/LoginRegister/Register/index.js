import React, { useState } from "react";
import {
    Page,
    List,
    ListInput,
    Button,
    f7,
    Sheet,
    PageContent,
    BlockTitle,
    Block,
    Link,
    Toolbar,
} from "framework7-react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "../styles.css";
import { useFormik } from "formik";
import axios from "axios";

class LoginPage extends React.Component {
    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        return (
            <Page className="padding white-background-skin">
                <div className="header-group">
                    <img
                        src="/toilet-marker.png"
                        alt="toilet"
                        className="toilet-marker"
                    ></img>
                    <div>
                        <h4 className="header">Palo Alto</h4>
                        <h3 className="header">Lavatories System</h3>
                    </div>
                </div>

                <h1>
                    Create a new<br></br>account!
                </h1>
                <Form></Form>
            </Page>
        );
    }
}

export default LoginPage;

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "Required";
    } else if (
        !/^[A-Z0-9a-z_]+$/i.test(values.name) ||
        values.name.length > 20
    ) {
        errors.name =
            "Name should contain alphabets, digits and _ only and at most 20 characters.";
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (
        !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i.test(
            values.password
        )
    ) {
        errors.password =
            "Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character and have between 8 and 15 characters.";
    }

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Different password.";
    }

    return errors;
};

const navigateToLogin = () => {
    f7.views.main.router.navigate("/login/");
};

const Form = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate,
        onSubmit: (values, { setFieldError }) => {
            axios
                .post("https://a3.dawo.me:4000/sign-up/customer", {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    authType: "native",
                })
                .then((response) => {
                    f7.views.main.router.navigate("/");
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        setFieldError("email", "This user already exists.");
                    }
                });
        },
    });

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <List noHairlines className="login-form">
                <ListInput
                    outline
                    label="Name"
                    floatingLabel
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                >
                    <div slot="root-end" className="error-message">
                        {formik.errors.name}
                    </div>
                </ListInput>

                <ListInput
                    outline
                    label="Email"
                    floatingLabel
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                >
                    <div slot="root-end" className="error-message">
                        {formik.errors.email}
                    </div>
                </ListInput>

                <ListInput
                    outline
                    label="Password"
                    floatingLabel
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    maxlength={20}
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                >
                    <span
                        slot="input"
                        className="visibility-icon"
                        onClick={toggleVisibility}
                    >
                        {visible ? (
                            <VisibilityOffIcon></VisibilityOffIcon>
                        ) : (
                            <VisibilityIcon></VisibilityIcon>
                        )}
                    </span>
                    <div slot="root-end" className="error-message">
                        {formik.errors.password}
                    </div>
                </ListInput>

                <ListInput
                    outline
                    label="Confirm password"
                    floatingLabel
                    type="password"
                    placeholder="Confirm password"
                    maxlength={20}
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                >
                    <div slot="root-end" className="error-message">
                        {formik.errors.confirmPassword}
                    </div>
                </ListInput>
            </List>

            <div className="bottom-group">
                <div className="terms-text">
                    When you click on Create account, you are agreeing to App
                    Name’s{" "}
                    <Link
                        className="terms-link"
                        sheetOpen=".demo-sheet-swipe-to-close"
                    >
                        terms of service
                    </Link>
                    .
                </div>
                <Button fill className="btn" type="submit">
                    Create account
                </Button>
                <Button outline className="btn" onClick={navigateToLogin}>
                    Log in to your account
                </Button>
            </div>
            <Sheet
                className="demo-sheet-swipe-to-close modal-sheet"
                swipeToClose
                backdrop
            >
                <Toolbar>
                    <div className="left"></div>
                    <div className="right">
                        <Link sheetClose>Close</Link>
                    </div>
                </Toolbar>
                <PageContent>
                    <BlockTitle large>Terms of services</BlockTitle>
                    <TermOfServicesBlock></TermOfServicesBlock>
                </PageContent>
            </Sheet>
        </form>
    );
};

const TermOfServicesBlock = () => (
    <Block>
        <p>Last updated 23 September 2020</p>
        <h4>AGREEMENT TO TERMS</h4>
        <p>
            These Terms of Service constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity (“you”)
            and [business entity name] (“we,” “us” or “our”), concerning your
            access to and use of the [website name.com] website as well as any
            other media form, media channel, mobile website or mobile
            application related, linked, or otherwise connected thereto
            (collectively, the “Site”).
        </p>
        <p>
            You agree that by accessing the Site, you have read, understood, and
            agree to be bound by all of these Terms of Service. If you do not
            agree with all of these Terms of Service, then you are expressly
            prohibited from using the Site and you must discontinue use
            immediately.
        </p>
        <p>
            Supplemental Terms of Service or documents that may be posted on the
            Site from time to time are hereby expressly incorporated herein by
            reference. We reserve the right, in our sole discretion, to make
            changes or modifications to these Terms of Service at any time and
            for any reason.
        </p>
        <p>
            We will alert you about any changes by updating the “Last updated”
            date of these Terms of Service, and you waive any right to receive
            specific notice of each such change.
        </p>
        <p>
            It is your responsibility to periodically review these Terms of
            Service to stay informed of updates. You will be subject to, and
            will be deemed to have been made aware of and to have accepted, the
            changes in any revised Terms of Service by your continued use of the
            Site after the date such revised Terms of Service are posted.
        </p>
        <p>
            The information provided on the Site is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation or which would subject us to any registration
            requirement within such jurisdiction or country.
        </p>
        <p>
            Accordingly, those persons who choose to access the Site from other
            locations do so on their own initiative and are solely responsible
            for compliance with local laws, if and to the extent local laws are
            applicable.
        </p>
        <p>
            [The Site is intended for users who are at least 13 years of age.]
            All users who are minors in the jurisdiction in which they reside
            (generally under the age of 18) must have the permission of, and be
            directly supervised by, their parent or guardian to use the Site. If
            you are a minor, you must have your parent or guardian read and
            agree to these Terms of Service prior to you using the Site.
        </p>
        <h4>USER REPRESENTATIONS</h4>
        <p>By using the Site, you represent and warrant that:</p>
        <ol>
            <li>
                all registration information you submit will be true, accurate,
                current, and complete.
            </li>
            <li>
                you will maintain the accuracy of such information and promptly
                update such registration information as necessary.
            </li>
            <li>
                you have the legal capacity and you agree to comply with these
                Terms of Service.
            </li>
            <li>you are not under the age of 13</li>
            <li>
                not a minor in the jurisdiction in which you reside [, or if a
                minor, you have received parental permission to use the Site]
            </li>
            <li>
                you will not access the Site through automated or non-human
                means, whether through a bot, script, or otherwise;
            </li>
            <li>
                you will not use the Site for any illegal or unauthorized
                purpose.
            </li>
            <li>
                your use of the Site will not violate any applicable law or
                regulation.
            </li>
        </ol>
        <p>
            If you provide any information that is untrue, inaccurate, not
            current, or incomplete, we have the right to suspend or terminate
            your account and refuse any and all current or future use of the
            Site (or any portion thereof).
        </p>
        <h4>USER REGISTRATION</h4>
        <p>
            You may be required to register with the Site. You agree to keep
            your password confidential and will be responsible for all use of
            your account and password. We reserve the right to remove, reclaim,
            or change a username you select if we determine, in our sole
            discretion, that such username is inappropriate, obscene, or
            otherwise objectionable.
        </p>
        <h4>PROHIBITED ACTIVITIES</h4>
        <p>
            You may not access or use the Site for any purpose other than that
            for which we make the Site available. The Site may not be used in
            connection with any commercial endeavors except those that are
            specifically endorsed or approved by us. As a user of the Site, you
            agree not to: systematically retrieve data or other content from the
            Site to create or compile, directly or indirectly, a collection,
            compilation, database, or directory without written permission from
            us. make any unauthorized use of the Site, including collecting
            usernames and/or email addresses of users by electronic or other
            means for the purpose of sending unsolicited email, or creating user
            accounts by automated means or under false pretenses. use a buying
            agent or purchasing agent to make purchases on the Site. use the
            Site to advertise or offer to sell goods and services. circumvent,
            disable, or otherwise interfere with security-related features of
            the Site, including features that prevent or restrict the use or
            copying of any Content or enforce limitations on the use of the Site
            and/or the Content contained therein. engage in unauthorized framing
            of or linking to the Site. trick, defraud, or mislead us and other
            users, especially in any attempt to learn sensitive account
            information such as user passwords; make improper use of our support
            services or submit false reports of abuse or misconduct. engage in
            any automated use of the system, such as using scripts to send
            comments or messages, or using any data mining, robots, or similar
            data gathering and extraction tools. interfere with, disrupt, or
            create an undue burden on the Site or the networks or services
            connected to the Site. attempt to impersonate another user or person
            or use the username of another user. sell or otherwise transfer your
            profile. use any information obtained from the Site in order to
            harass, abuse, or harm another person. use the Site as part of any
            effort to compete with us or otherwise use the Site and/or the
            Content for any revenue-generating endeavor or commercial
            enterprise. decipher, decompile, disassemble, or reverse engineer
            any of the software comprising or in any way making up a part of the
            Site. attempt to bypass any measures of the Site designed to prevent
            or restrict access to the Site, or any portion of the Site. harass,
            annoy, intimidate, or threaten any of our employees or agents
            engaged in providing any portion of the Site to you. delete the
            copyright or other proprietary rights notice from any Content. copy
            or adapt the Site’s software, including but not limited to Flash,
            PHP, HTML, JavaScript, or other code. upload or transmit (or attempt
            to upload or to transmit) viruses, Trojan horses, or other material,
            including excessive use of capital letters and spamming (continuous
            posting of repetitive text), that interferes with any party’s
            uninterrupted use and enjoyment of the Site or modifies, impairs,
            disrupts, alters, or interferes with the use, features, functions,
            operation, or maintenance of the Site. upload or transmit (or
            attempt to upload or to transmit) any material that acts as a
            passive or active information collection or transmission mechanism,
            including without limitation, clear graphics interchange formats
            (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices
            (sometimes referred to as “spyware” or “passive collection
            mechanisms” or “pcms”). except as may be the result of standard
            search engine or Internet browser usage, use, launch, develop, or
            distribute any automated system, including without limitation, any
            spider, robot, cheat utility, scraper, or offline reader that
            accesses the Site, or using or launching any unauthorized script or
            other software. disparage, tarnish, or otherwise harm, in our
            opinion, us and/or the Site. use the Site in a manner inconsistent
            with any applicable laws or regulations.
        </p>
        <h4>USER GENERATED CONTRIBUTIONS</h4>
        <p>
            The Site may invite you to chat, contribute to, or participate in
            blogs, message boards, online forums, and other functionality, and
            may provide you with the opportunity to create, submit, post,
            display, transmit, perform, publish, distribute, or broadcast
            content and materials to us or on the Site, including but not
            limited to text, writings, video, audio, photographs, graphics,
            comments, suggestions, or personal information or other material
            (collectively, “Contributions”).
        </p>
        <p>
            Contributions may be viewable by other users of the Site and through
            third-party websites. As such, any Contributions you transmit may be
            treated as non-confidential and non-proprietary. When you create or
            make available any Contributions, you thereby represent and warrant
            that:
        </p>
        <p>
            the creation, distribution, transmission, public display, or
            performance, and the accessing, downloading, or copying of your
            Contributions do not and will not infringe the proprietary rights,
            including but not limited to the copyright, patent, trademark, trade
            secret, or moral rights of any third party. you are the creator and
            owner of or have the necessary licenses, rights, consents, releases,
            and permissions to use and to authorize us, the Site, and other
            users of the Site to use your Contributions in any manner
            contemplated by the Site and these Terms of Service. you have the
            written consent, release, and/or permission of each and every
            identifiable individual person in your Contributions to use the name
            or likeness of each and every such identifiable individual person to
            enable inclusion and use of your Contributions in any manner
            contemplated by the Site and these Terms of Service. your
            Contributions are not false, inaccurate, or misleading. your
            Contributions are not unsolicited or unauthorized advertising,
            promotional materials, pyramid schemes, chain letters, spam, mass
            mailings, or other forms of solicitation. your Contributions are not
            obscene, lewd, lascivious, filthy, violent, harassing, libelous,
            slanderous, or otherwise objectionable (as determined by us). your
            Contributions do not ridicule, mock, disparage, intimidate, or abuse
            anyone. your Contributions do not advocate the violent overthrow of
            any government or incite, encourage, or threaten physical harm
            against another. your Contributions do not violate any applicable
            law, regulation, or rule. your Contributions do not violate the
            privacy or publicity rights of any third party. your Contributions
            do not contain any material that solicits personal information from
            anyone under the age of 18 or exploits people under the age of 18 in
            a sexual or violent manner. your Contributions do not violate any
            federal or state law concerning child pornography, or otherwise
            intended to protect the health or well-being of minors; your
            Contributions do not include any offensive comments that are
            connected to race, national origin, gender, sexual preference, or
            physical handicap. your Contributions do not otherwise violate, or
            link to material that violates, any provision of these Terms of
            Service, or any applicable law or regulation. Any use of the Site in
            violation of the foregoing violates these Terms of Service and may
            result in, among other things, termination or suspension of your
            rights to use the Site.
        </p>
        <h4>GUIDELINES FOR REVIEWS</h4>
        <p>
            We may provide you areas on the Site to leave reviews or ratings.
            When posting a review, you must comply with the following criteria:
        </p>
        <p>
            (1) you should have firsthand experience with the person/entity
            being reviewed; (2) your reviews should not contain offensive
            profanity, or abusive, racist, offensive, or hate language; (3) your
            reviews should not contain discriminatory references based on
            religion, race, gender, national origin, age, marital status, sexual
            orientation, or disability; (4) your reviews should not contain
            references to illegal activity; (5) you should not be affiliated
            with competitors if posting negative reviews; (6) you should not
            make any conclusions as to the legality of conduct; (7) you may not
            post any false or misleading statements; (8) you may not organize a
            campaign encouraging others to post reviews, whether positive or
            negative.
        </p>
        <p>
            We may accept, reject, or remove reviews in our sole discretion. We
            have absolutely no obligation to screen reviews or to delete
            reviews, even if anyone considers reviews objectionable or
            inaccurate. Reviews are not endorsed by us, and do not necessarily
            represent our opinions or the views of any of our affiliates or
            partners.
        </p>
        <p>
            We do not assume liability for any review or for any claims,
            liabilities, or losses resulting from any review. By posting a
            review, you hereby grant to us a perpetual, non-exclusive,
            worldwide, royalty-free, fully-paid, assignable, and sublicensable
            right and license to reproduce, modify, translate, transmit by any
            means, display, perform, and/or distribute all content relating to
            reviews.
        </p>
        <h4>SITE MANAGEMENT</h4>
        <p>We reserve the right, but not the obligation, to:</p>
        <p>
            (1) monitor the Site for violations of these Terms of Service; (2)
            take appropriate legal action against anyone who, in our sole
            discretion, violates the law or these Terms of Service, including
            without limitation, reporting such user to law enforcement
            authorities; (3) in our sole discretion and without limitation,
            refuse, restrict access to, limit the availability of, or disable
            (to the extent technologically feasible) any of your Contributions
            or any portion thereof; (4) in our sole discretion and without
            limitation, notice, or liability, to remove from the Site or
            otherwise disable all files and content that are excessive in size
            or are in any way burdensome to our systems; (5) otherwise manage
            the Site in a manner designed to protect our rights and property and
            to facilitate the proper functioning of the Site.
        </p>
        <h4>PRIVACY POLICY</h4>
        <p>
            We care about data privacy and security. By using the Site, you
            agree to be bound by our Privacy Policy, which is incorporated into
            these Terms of Service. Please be advised the Site is hosted in the
            United States. If you access the Site from the European Union, Asia,
            or any other region of the world with laws or other requirements
            governing personal data collection, use, or disclosure that differ
            from applicable laws in the United States, then through your
            continued use of the Site, you are transferring your data to the
            United States, and you expressly consent to have your data
            transferred to and processed in the United States.
        </p>
        <h4>CONTACT US</h4>
        <p>
            In order to resolve a complaint regarding the Site or to receive
            further information regarding use of the Site, please contact us at:
        </p>
        <p>Tel: +65 9900 1111</p>
    </Block>
);
