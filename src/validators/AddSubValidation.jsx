import * as Yup from "yup";

const agentSchema = Yup.object().shape({
  agentId: Yup.string().required("Agent is required"),
  agentPercentage: Yup.number()
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage cannot exceed 100")
    .required("Agent percentage is required"),
  notes: Yup.string().optional(),
});

const subSchema = Yup.object().shape({
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
  costPermonth: Yup.number()
    .min(0, "Cost must be at least 0")
    .required("Cost per month is required"),
  clientId: Yup.string().required("Client is required"),
  agentsDtos: Yup.array().of(agentSchema).min(1, "At least one agent is required"),
  notes: Yup.string().optional(),
});

export default subSchema;
