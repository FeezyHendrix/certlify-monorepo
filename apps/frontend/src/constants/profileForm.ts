const profileForm = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'First Name',
        required: true,        
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Last Name',
        required: true,        
    }
];

// Write a data that will be used as an option of a select input in a form which is an occupation list

const occupationList = [
    {
        value: 'student',
        label: 'Student'
    },
    {
        value: 'teacher',
        label: 'Teacher'
    },
    {
        value: 'engineer',
        label: 'Engineer'
    },
    {
        value: 'doctor',
        label: 'Doctor'
    },
    {
        value: 'others',
        label: 'Others'
    }
];

const industryList = [
    {
        value: 'tech',
        label: 'Tech'
    },
    {
        value: 'education',
        label: 'Education'
    },
    {
        value: 'health',
        label: 'Health'
    },
    {
        value: 'others',
        label: 'Others'
    }
];

export { profileForm, occupationList, industryList };