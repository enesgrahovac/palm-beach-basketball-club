import { NextResponse } from "next/server";

interface WaiverData {
  applicantId: string;
  fullName: string;
  emergencyName: string;
  emergencyPhone: string;
  agreedToWaiver: boolean;
  signedAt: string;
}

export async function POST(request: Request) {
  try {
    const data: WaiverData = await request.json();

    if (!data.fullName || !data.agreedToWaiver || !data.emergencyName || !data.emergencyPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Capture IP for the signed record
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const record = {
      ...data,
      ip,
    };

    if (
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY
    ) {
      await appendToGoogleSheet(record);
    } else {
      console.log("Waiver signed:", record);
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("Error processing waiver");
    return NextResponse.json(
      { error: "Failed to process waiver" },
      { status: 500 }
    );
  }
}

async function appendToGoogleSheet(
  data: WaiverData & { ip: string }
) {
  const { google } = await import("googleapis");

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: "Waivers!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.signedAt,
          data.applicantId,
          data.fullName,
          data.emergencyName,
          data.emergencyPhone,
          data.agreedToWaiver ? "Yes" : "No",
          data.ip,
        ],
      ],
    },
  });
}
