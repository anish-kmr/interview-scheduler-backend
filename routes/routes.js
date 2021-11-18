export default {
    main: {
        meeting: "/meeting",
        participant: "/participant",
        admin: "/admin",
    },
    meeting: {
        getMeetings: "/",
        getAdminMeetings: "/admin/:id",
        createMeeting: "/",
        updateMeeting: "/:id",
        getMeetingById: "/:id",
        updateMeetingStatus: "/status"
    },
    participant: {
        getParticipants: "/",
        createParticipant: "/",
        updateParticipant: "/:id",
        getParticipantById: "/:id",
    },
    admin: {
        createAdmin: "/",
        login: "/login"
    }
}