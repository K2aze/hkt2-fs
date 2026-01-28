"use client";

import { useEffect, useState } from "react";
import { http } from "@/lib/http"; // Điều chỉnh path theo project của bạn
import { InferSelectModel } from "drizzle-orm";
import { bookingsTable } from "@/server/db/schema";

type BookingInfer = InferSelectModel<typeof bookingsTable>;

interface BookingsResponse {
  message: BookingInfer[];
}

export default function AllBooking() {
  const [bookings, setBookings] = useState<BookingInfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await http.get("bookings");
        const data = await response.data;
        console.log(data.message);
        setBookings(data.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString);
  };

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <p>Đang tải danh sách booking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" aria-live="assertive">
        <p>Lỗi: {error}</p>
      </div>
    );
  }

  if (bookings.length == 0) {
    return (
      <div role="status">
        <p>Không có booking nào.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Tất cả các Booking</h1>
      <p>all: {bookings.length} bookings</p>
      <ul>
        {bookings.map((item) => (
          <li key={item.id}>
            <article>
              <p>{item.full_name}</p>
              <p>{item.email}</p>
              <p>{item.booking_date.toString()}</p>
              <p>{item.time}</p>
              <p>{item.status}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
