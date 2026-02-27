import { NextResponse } from "next/server";

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  experience: string;
  goals: string;
  whyJoin: string;
  referral: string;
}

export async function POST(request: Request) {
  try {
    const data: ApplicationData = await request.json();

    // Validate required fields
    const required: (keyof ApplicationData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "age",
      "experience",
      "goals",
      "whyJoin",
    ];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // If Google Sheets credentials are configured, append the row
    if (
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY
    ) {
      await appendToGoogleSheet(data);
    } else {
      // Fallback: log to console (useful for local dev)
      console.log("New application received:", data);
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("Error processing application");
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}

async function appendToGoogleSheet(data: ApplicationData) {
  const { google } = await import("googleapis");

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: "Applications!A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          data.firstName,
          data.lastName,
          data.email,
          data.phone,
          data.age,
          data.experience,
          data.goals,
          data.whyJoin,
          data.referral || "",
        ],
      ],
    },
  });
}
