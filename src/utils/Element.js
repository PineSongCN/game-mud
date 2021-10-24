import {
    Dialog,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Form,
    FormItem,
    Tag,
    Alert,
    Icon,
    Row,
    Col,
    Spinner,
    Badge,
    Link,
    Divider,
    Image,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui';
const install = function (Vue, opts = {}) {
    Vue.use(Dialog);
    Vue.use(Input);
    Vue.use(InputNumber);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(RadioButton);
    Vue.use(Checkbox);
    Vue.use(CheckboxButton);
    Vue.use(CheckboxGroup);
    Vue.use(Switch);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Button);
    Vue.use(ButtonGroup);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(DatePicker);
    Vue.use(TimeSelect);
    Vue.use(TimePicker);
    Vue.use(Popover);
    Vue.use(Tooltip);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Tag);
    Vue.use(Alert);
    Vue.use(Icon);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Spinner);
    Vue.use(Badge);

    Vue.use(Link);
    Vue.use(Divider);
    Vue.use(Image);

    Vue.use(Loading.directive);

    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;

    Vue.prototype.$ELEMENT = {
        size: opts.size || 'mini',
        zIndex: 3000
    };
};

export default {
    install
};
