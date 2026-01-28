"use client";
import { http } from "@/lib/http";
import { bookingDateString } from "@/lib/validations";
// import { useAuth } from "@/providers/AuthContext";
import { useForm } from "@tanstack/react-form-nextjs";
import z from "zod";

export const bookingSchemaForm = z.object({
  fullName: z.string().min(1),
  email: z.email(),
  phoneNumber: z
    .string()
    .min(8, "PHONE_REQUIRED")
    .regex(/^\d+$/, "PHONE_INVALID"),
  bookingDate: bookingDateString,
  people: z.number().int().min(1).max(10),
  services: z.array(z.number()).nullable(),
  time: z.string(),
  subscription: z.boolean(),
  request: z.string(),
});

const BookingForm = () => {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      bookingDate: "",
      people: 1,
      services: null, // hoặc [] nếu bạn muốn mảng rỗng thay vì null
      time: "morning",
      subscription: false,
      requests: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form data", value);
      console.log("Submited");
      try {
        await http.post("bookings", value);
      } catch (error: unknown) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="fullName"
            validators={{
              onChange: bookingSchemaForm.shape.fullName,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Full name</label>
                <input
                  type="text"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, idx) => (
                      <em key={idx} role="alert">
                        {err?.message ||
                          (typeof err === "string"
                            ? err
                            : JSON.stringify(err) || "unknown")}
                      </em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field
            name="email"
            validators={{
              onChange: bookingSchemaForm.shape.email,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Email</label>
                <input
                  type="email"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, idx) => (
                      <em key={idx} role="alert">
                        {err?.message ||
                          (typeof err === "string"
                            ? err
                            : JSON.stringify(err) || "unknown")}
                      </em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field
            name="phoneNumber"
            validators={{
              onChange: bookingSchemaForm.shape.phoneNumber,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Phone number</label>
                <input
                  type="string"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, idx) => (
                      <em key={idx} role="alert">
                        {err?.message ||
                          (typeof err === "string"
                            ? err
                            : JSON.stringify(err) || "unknown")}
                      </em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field
            name="bookingDate"
            validators={{
              onChange: bookingSchemaForm.shape.bookingDate,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Date</label>
                <input
                  type="date"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, idx) => (
                      <em key={idx} role="alert">
                        {err?.message ||
                          (typeof err === "string"
                            ? err
                            : JSON.stringify(err) || "unknown")}
                      </em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field
            name="people"
            validators={{
              onChange: bookingSchemaForm.shape.people,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Participants</label>
                <input
                  type="number"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, idx) => (
                      <em key={idx} role="alert">
                        {err?.message ||
                          (typeof err === "string"
                            ? err
                            : JSON.stringify(err) || "unknown")}
                      </em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <span>Services (dịch vụ)</span>

          <form.Field
            name="services"
            // Nếu schema cho phép null → default là null, nếu muốn mảng rỗng thì [] trong defaultValues
            validators={{
              onChange: bookingSchemaForm.shape.services,
            }}
          >
            {(field) => {
              // Giá trị hiện tại: number[] | null
              const currentValues = field.state.value ?? [];

              const toggleService = (serviceId: number) => {
                if (currentValues.includes(serviceId)) {
                  // Bỏ chọn → remove
                  field.handleChange(
                    currentValues.filter((id) => id !== serviceId),
                  );
                } else {
                  // Chọn → add
                  field.handleChange([...currentValues, serviceId]);
                }
              };

              return (
                <div className="flex flex-wrap gap-4 mt-2">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <div key={id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`service-${id}`}
                        checked={currentValues.includes(id)}
                        onChange={() => toggleService(id)}
                      />
                      <label htmlFor={`service-${id}`}>Service {id}</label>
                    </div>
                  ))}
                </div>
              );
            }}
          </form.Field>

          {/* Hiển thị lỗi nếu có (ví dụ bắt buộc chọn ít nhất 1) */}
          <form.Field name="services">
            {(field) => (
              <>
                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, i) => (
                      <em key={i}>{err?.message || "Lỗi"}</em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <label htmlFor="time">Thời gian</label>

          <form.Field
            name="time"
            validators={{
              onChange: bookingSchemaForm.shape.time,
            }}
          >
            {(field) => (
              <>
                <select
                  id="time"
                  value={field.state.value ?? "morning"} // fallback nếu null
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>

                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, i) => (
                      <em key={i}>{err?.message || "Lỗi"}</em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div className="flex items-center gap-2">
          <form.Field
            name="subscription"
            validators={{
              onChange: bookingSchemaForm.shape.subscription,
            }}
          >
            {(field) => (
              <>
                <input
                  type="checkbox"
                  id="subscription"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                />
                <label htmlFor="subscription">
                  Đăng ký nhận thông tin (Subscription)
                </label>

                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm block">
                    {field.state.meta.errors.map((err, i) => (
                      <em key={i}>{err?.message}</em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field
            name="requests"
            validators={{
              onChange: bookingSchemaForm.shape.request,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Request</label>
                <textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, idx) => (
                      <em key={idx} role="alert">
                        {err?.message ||
                          (typeof err === "string"
                            ? err
                            : JSON.stringify(err) || "unknown")}
                      </em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Loading" : "Đăng kí"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default BookingForm;
