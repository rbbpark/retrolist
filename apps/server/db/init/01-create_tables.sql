CREATE TABLE handheld_devices (
    -- Device identification
    id VARCHAR(255) PRIMARY KEY,
    image_id VARCHAR(255) NOT NULL,
    device_name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,

    -- System specifications
    form_factor VARCHAR(255) NOT NULL,
    os_raw VARCHAR(255) NOT NULL,

    -- Emulation (1-5 rating)
    gbc SMALLINT NOT NULL,
    nes SMALLINT  NOT NULL,
    genesis SMALLINT NOT NULL,
    gba SMALLINT NOT NULL, 
    snes SMALLINT NOT NULL,
    psx SMALLINT NOT NULL,
    nds SMALLINT NOT NULL,
    n64 SMALLINT NOT NULL,
    dreamcast SMALLINT NOT NULL,
    psp SMALLINT NOT NULL,
    saturn SMALLINT NOT NULL,
    ngc SMALLINT NOT NULL,
    wii SMALLINT NOT NULL,
    n3ds SMALLINT NOT NULL,
    ps2 SMALLINT NOT NULL,
    wiiu SMALLINT NOT NULL,
    switch SMALLINT NOT NULL,
    ps3 SMALLINT NOT NULL,

    -- SoC specifications
    chipset VARCHAR(255),
    cpu_model VARCHAR(255),
    cpu_cores VARCHAR(255),
    cpu_threads VARCHAR(255),
    cpu_clock VARCHAR(255),
    cpu_arch VARCHAR(255),
    gpu_model VARCHAR(255),
    gpu_cores VARCHAR(255),
    gpu_clock VARCHAR(255),
    ram_gb VARCHAR(255),

    -- Display specs
    screen_size_inches DECIMAL(10,2) NOT NULL,
    screen_type VARCHAR(255) NOT NULL,
    resolution VARCHAR(255) NOT NULL,
    ppi DECIMAL(10,2) NOT NULL,
    aspect_ratio VARCHAR(20) NOT NULL,
    screen_lens VARCHAR(255),

    -- Hardware specs
    battery_capacity VARCHAR(255) NOT NULL,
    cooling_raw VARCHAR(255),
    has_cooling BOOLEAN,  -- T, F, null indicates unknown

    -- Control specs
    dpad_raw VARCHAR(255) NOT NULL,
    analogs_raw VARCHAR(255),
    has_l3_r3 BOOLEAN NOT NULL,  -- F may be unknown
    has_hall_analogs BOOLEAN NOT NULL,  -- F may be unknown
    has_dual_analogs BOOLEAN NOT NULL,  -- F may be unknown
    has_analogs BOOLEAN NOT NULL,  -- F may be unknown
    face_buttons VARCHAR(255) NOT NULL,
    shoulder_buttons_raw VARCHAR(255),
    has_analog_triggers BOOLEAN NOT NULL, -- F may be unknown
    has_l2_r2 BOOLEAN NOT NULL, -- F may be unknown
    has_shoulder_buttons BOOLEAN NOT NULL, -- F may be unknown
    extra_buttons_raw TEXT,

    -- Connectivity specs
    charge_port_raw VARCHAR(255) NOT NULL,
    storage_raw VARCHAR(255) NOT NULL,
    has_dual_external_sd BOOLEAN NOT NULL,
    connectivity_raw VARCHAR(255),
    has_lte BOOLEAN NOT NULL, -- F may be unknown ( 1 item )
    has_usb_otg BOOLEAN NOT NULL, -- F may be unknown
    has_thunderbolt BOOLEAN NOT NULL, -- F may be unknown
    has_bt BOOLEAN NOT NULL, -- F may be unknown
    has_wifi BOOLEAN NOT NULL, -- F may be unknown
    video_output_raw VARCHAR(255),  -- if null could be none or unknown
    has_video_output BOOLEAN,  -- T, F, null indicates unknown
    audio_output_raw VARCHAR(255), 
    has_audio_output BOOLEAN NOT NULL,
    speaker_raw VARCHAR(255),
    has_rumble BOOLEAN,  -- T, F, null indicates unknown
    sensors_raw TEXT,
    volume_desc VARCHAR(255),

    -- Exterior specs
    dimensions_mm VARCHAR(255),
    weight_g INTEGER,
    shell_material VARCHAR(255) NOT NULL,
    color_options TEXT NOT NULL,

    -- reviews, pricing, emulation notes
    reviews TEXT,
    price_low DECIMAL(10,2) NOT NULL,
    price_high DECIMAL(10,2),
    emulation_desc TEXT

);