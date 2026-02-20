// Email template options organized by role
const emailOptions = {
    all: [
        { value: 'ethical', label: 'Ethical Concerns (ICE Connection)' },
        { value: 'environmental', label: 'Environmental Impact' },
        { value: 'academic-integrity', label: 'Academic Integrity Hypocrisy' },
        { value: 'accuracy', label: 'Accuracy and Fairness Concerns' },
        { value: 'learning-tool', label: '"Learning Tool" Distinction Is Irrelevant' },
        { value: 'data-privacy', label: 'Student Data Privacy Concerns' },
        { value: 'educational-research', label: 'Research Shows AI Harms Learning' },
        { value: 'vendor-dependence', label: 'Vendor Lock-In & Cost Concerns' },
        { value: 'false-objectivity', label: 'False Objectivity of AI Grading' }
    ],
    Parent: [
        { value: 'accuracy-parent', label: 'Accuracy Concerns (Parent Perspective)' },
        { value: 'data-privacy', label: 'My Child\'s Data Privacy' }
    ],
    Student: [
        { value: 'ethical-personal', label: 'Ethical Concerns (Personal Connection)' },
        { value: 'environmental-student', label: 'Environmental (Student Perspective)' },
        { value: 'academic-integrity-student', label: 'Academic Integrity (Student Voice)' }
    ],
    Teacher: [
        { value: 'teacher-concerns-educator', label: 'Teacher Concerns (Educator Voice)' },
        { value: 'labor-implications', label: 'Labor & Job Security Concerns' },
        { value: 'educational-research', label: 'Research on AI in Education' }
    ],
    'Community Member': [
        { value: 'vendor-dependence', label: 'Taxpayer Cost & Vendor Lock-In' },
        { value: 'ethical', label: 'Community Ethics & Values' }
    ]
};

// Update concerns based on selected role
function updateConcernsForRole() {
    const role = document.getElementById('role').value;
    const container = document.getElementById('concernsContainer');
    const message = document.getElementById('selectRoleMessage');
    
    // Show container, hide message
    container.style.display = 'flex';
    if (message) message.style.display = 'none';
    
    // Clear existing checkboxes
    container.innerHTML = '';
    
    // Add general options (available to all)
    emailOptions.all.forEach(option => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        label.innerHTML = `
            <input type="checkbox" value="${option.value}" class="concern-checkbox">
            ${option.label}
        `;
        container.appendChild(label);
    });
    
    // Add role-specific options
    if (emailOptions[role]) {
        emailOptions[role].forEach(option => {
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            label.innerHTML = `
                <input type="checkbox" value="${option.value}" class="concern-checkbox">
                ${option.label} ⭐
            `;
            container.appendChild(label);
        });
    }
    
    // Re-attach checkbox limit listener
    document.querySelectorAll('.concern-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('.concern-checkbox:checked');
            if (checkedBoxes.length > 3) {
                this.checked = false;
                alert('Please select no more than 3 concerns for a focused, effective letter.');
            }
        });
    });
}

// Initialize concerns on page load and when role changes
document.getElementById('role').addEventListener('change', updateConcernsForRole);

// Email templates
const templates = {
    ethical: `These platforms are powered by OpenAI's GPT-4 technology. OpenAI is a major contractor and donor to Immigration and Customs Enforcement (ICE), providing technology used in deportation operations and surveillance of immigrant communities. When Amity funds these products, we are indirectly supporting activities that may harm families in our own district.

As a community that claims to value inclusion and safety for all students, we cannot justify funding companies whose technology is used to separate families and target vulnerable populations. This creates a direct conflict between our stated values and our purchasing decisions.`,

    'ethical-personal': `These platforms are powered by OpenAI's GPT-4 technology. OpenAI is a major contractor and donor to Immigration and Customs Enforcement (ICE), providing technology used in deportation operations and surveillance of immigrant communities. When Amity funds these products, we are indirectly supporting activities that may harm families in our own district.

As a community that claims to value inclusion and safety for all students, we cannot justify funding companies whose technology is used to separate families and target vulnerable populations. This creates a direct conflict between our stated values and our purchasing decisions.

As [a student/parent/community member/immigrant/child of immigrants], I am deeply troubled that my school district would financially support companies involved in deportation operations that could directly affect members of our community.`,

    environmental: `AI systems have a catastrophic environmental footprint. Data centers supporting AI consumed 460 terawatt hours of electricity in 2022—roughly equivalent to the entire nation of France. By 2026, that figure is projected to exceed 1,050 terawatt hours, ranking between Japan and Russia in global energy consumption.

OpenAI's servers alone require approximately 20 million gallons of water daily for cooling. Communities near these data centers are experiencing water shortages and drinking water contamination.

We cannot credibly teach environmental responsibility while simultaneously funding technology that contributes to environmental destruction on such a massive scale. This hypocrisy undermines the integrity of our entire curriculum.`,

    'environmental-student': `AI systems have a catastrophic environmental footprint. Data centers supporting AI consumed 460 terawatt hours of electricity in 2022—roughly equivalent to the entire nation of France. By 2026, that figure is projected to exceed 1,050 terawatt hours, ranking between Japan and Russia in global energy consumption.

OpenAI's servers alone require approximately 20 million gallons of water daily for cooling. Communities near these data centers are experiencing water shortages and drinking water contamination.

As a student, I am taught to care about climate change and take environmental responsibility seriously. Yet my school is making purchasing decisions that directly contradict those lessons. We cannot credibly teach environmental responsibility while simultaneously funding technology that contributes to environmental destruction on such a massive scale.`,

    'academic-integrity': `Students at Amity are explicitly prohibited from using AI tools like ChatGPT for their assignments. Using AI assistance is considered plagiarism under our academic integrity policy, resulting in office referrals, parent contact, and zeros on assignments.

Yet the district is purchasing these same AI tools to evaluate student work. Students are punished for outsourcing their thinking, while the school outsources its judgment. This double standard is indefensible and teaches students that power determines morality, not principles.

If AI cannot be trusted for authentic student work, it cannot be trusted for authentic assessment of that work.`,

    'academic-integrity-student': `Students at Amity are explicitly prohibited from using AI tools like ChatGPT for their assignments. Using AI assistance is considered plagiarism under our academic integrity policy, resulting in office referrals, parent contact, and zeros on assignments.

Yet the district is purchasing these same AI tools to evaluate student work. Students are punished for outsourcing their thinking, while the school outsources its judgment. This double standard is indefensible.

As a student, I am held to a standard of academic honesty that apparently doesn't apply to the institution itself. This teaches me that power determines morality, not principles. If AI cannot be trusted for authentic student work, it cannot be trusted for authentic assessment of that work.`,

    accuracy: `These systems are fundamentally unreliable. Students have reported multiple instances of AI incorrectly marking responses as partial or no credit, only to have them verified as fully correct upon teacher review. When a system regularly requires human correction, it has already failed its primary purpose.

Grades determine GPAs, transcripts, college admissions, and scholarship opportunities. A system that makes errors requiring correction after grades are assigned should never be trusted to assess student work in the first place. The burden then falls on students to notice mistakes, challenge them, and hope human review catches every error. That is unreasonable and introduces unnecessary stress and inequity.`,

    'accuracy-parent': `These systems are fundamentally unreliable. Students have reported multiple instances of AI incorrectly marking responses as partial or no credit, only to have them verified as fully correct upon teacher review. When a system regularly requires human correction, it has already failed its primary purpose.

As a parent, I am deeply concerned that my child's grades—which directly affect their GPA, transcript, college admissions, and scholarship opportunities—could be determined by an error-prone algorithm. My child's future should not depend on catching an algorithm's mistakes. A system that makes errors requiring correction after grades are assigned should never be trusted to assess student work in the first place.`,

    'teacher-concerns': `The teachers who would be required to use these tools have expressed serious concerns. They worry that AI-mediated feedback erodes the teacher-student relationships that make learning meaningful. They worry about job security as "learning tools" become replacement tools. They worry about being pressured to use technology they're inadequately trained on and don't believe serves students.

When the actual experts in education—our teachers—unanimously oppose a technology, that should carry far more weight than a vendor's sales pitch. Teachers understand what students need in ways no algorithm can replicate.`,

    'teacher-concerns-educator': `As an educator at Amity, I can state directly that these tools undermine rather than support my ability to know and teach my students effectively. AI-mediated feedback erodes the teacher-student relationships that make learning meaningful. These relationships are built through engaging deeply with student work, understanding their thinking, and recognizing their growth—none of which an algorithm can replicate.

I am also concerned about the pressure to use technology I'm inadequately trained on and don't believe serves students well. When teachers unanimously oppose a technology, that professional judgment should carry far more weight than administrative efficiency or vendor promises.`,

    'learning-tool': `I understand the administration has clarified these are "learning tools" rather than "grading tools." This distinction is meaningless for three reasons:

First, any tool that provides numerical feedback (like "1 out of 3") influences grades, whether directly or indirectly. Students and parents cannot distinguish between formative feedback and summative assessment when both use the same scoring system.

Second, even if these tools never determine a single final grade, the ethical problems remain unchanged. Funding OpenAI still supports ICE operations. The environmental impact is identical. The message about AI's role in education is the same.

Third, without clear, enforced guidelines on appropriate use, "learning tools" inevitably become grading tools in practice. Once purchased, there's institutional pressure to justify the expense and expand usage.`,

    'data-privacy': `These AI platforms require uploading student work to third-party servers. This raises serious data privacy concerns. Student writing, personal reflections, and intellectual property are being fed into corporate databases with unclear retention policies and potential for data breaches.

We have no guarantee about what happens to student data once it's uploaded. Will it be used to train future AI models? Sold to third parties? Retained indefinitely? Students and families deserve transparency about how their private educational data is being used.

Additionally, FERPA protections may not adequately cover AI-processed student work, creating potential legal liability for the district.`,

    'educational-research': `Research consistently shows that AI feedback does not improve learning outcomes compared to human feedback. A 2024 MIT study found that students who relied on AI tools showed decreased critical thinking skills and problem-solving abilities. They become dependent on algorithmic suggestions rather than developing independent analytical skills.

Furthermore, studies show AI cannot provide the nuanced, context-aware feedback that facilitates genuine learning. It cannot recognize a student's growth trajectory, understand their individual challenges, or adapt feedback to their specific learning style. These are fundamentally human capabilities that algorithms cannot replicate.`,

    'vendor-dependence': `By adopting these platforms, Amity creates vendor lock-in. Once we've built curricula around these tools, trained teachers to use them, and made them central to assessment, switching becomes prohibitively expensive and disruptive.

This gives companies like OpenAI tremendous leverage over future pricing and contract terms. We've seen this pattern repeatedly with educational technology: introductory pricing that seems reasonable, followed by dramatic increases once districts are dependent.

We should invest in sustainable, district-controlled solutions rather than creating dependency on profit-driven corporations.`,

    'labor-implications': `This technology represents the first step toward replacing educators with algorithms. Today it's "just feedback." Tomorrow it's automated grading. Eventually it's AI-delivered instruction. We've seen this pattern in other industries—automation starts as "assistance" and ends as replacement.

Teachers are already overworked and undervalued. Instead of funding tools that could eventually eliminate teaching positions, we should be investing in hiring more teachers, reducing class sizes, and improving working conditions. That's how you improve education—not through technological shortcuts.`,

    'false-objectivity': `AI grading creates a dangerous illusion of objectivity. Because it's algorithmic, people assume it must be fair and unbiased. In reality, AI systems replicate and often amplify the biases in their training data.

This "objectivity bias" makes errors harder to challenge. When a teacher makes a grading mistake, students can question it. When an algorithm makes the same mistake, it's treated as authoritative. The system becomes less accountable, not more.

Moreover, reducing education to what can be algorithmically assessed narrows our definition of learning. The most important educational outcomes—critical thinking, creativity, ethical reasoning—cannot be measured by AI.`
};

// Generate letter function - displays letter
function generateLetter() {
    const name = document.getElementById('name').value.trim();
    const role = document.getElementById('role').value;
    
    const selectedConcerns = Array.from(document.querySelectorAll('.concern-checkbox:checked'))
        .map(cb => cb.value);

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    if (selectedConcerns.length === 0) {
        alert('Please select at least one concern.');
        return;
    }

    if (selectedConcerns.length > 3) {
        alert('Please select no more than 3 concerns for a focused letter.');
        return;
    }

    // Build the letter
    let letter = `Dear Amity Board of Education,

I am writing to oppose funding for AI-powered learning tools at Amity Regional High School, including Class Companion, SchoolAI, and Magic School AI.

`;

    // Add selected concern sections
    selectedConcerns.forEach((concern, index) => {
        if (index > 0) letter += '\n\n';
        letter += templates[concern];
    });

    // Add closing
    letter += `

For these reasons, I am asking you to vote no on this funding. Do not make Amity complicit in supporting ICE operations, environmental destruction, or the erosion of teacher-student relationships. Invest in people, not algorithms.

Students, families, and teachers are telling you this is wrong. Please listen.

Sincerely,

${name}
${role}`;

    // Store letter globally for mailto button
    window.currentLetter = letter;
    
    // Display the letter
    document.getElementById('letterContent').textContent = letter;
    document.getElementById('letterOutput').style.display = 'block';
    document.getElementById('letterOutput').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Mailto button function
function sendViaEmail() {
    if (!window.currentLetter) {
        alert('Please generate your letter first.');
        return;
    }
    
    const subject = encodeURIComponent('Opposition to AI Funding in Amity Schools');
    const body = encodeURIComponent(window.currentLetter);
    const mailtoLink = `mailto:boardofed@amityregion5.org?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
}

// Copy to clipboard function
function copyToClipboard() {
    const letterText = document.getElementById('letterContent').textContent;
    
    navigator.clipboard.writeText(letterText).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.backgroundColor = '#2e7d32';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy. Please select and copy the text manually.');
    });
}

// Download as text file function
function downloadLetter() {
    const letterText = document.getElementById('letterContent').textContent;
    const name = document.getElementById('name').value.trim();
    
    const blob = new Blob([letterText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `letter-to-amity-board-${name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Event listeners
document.getElementById('generateBtn').addEventListener('click', generateLetter);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
document.getElementById('downloadBtn').addEventListener('click', downloadLetter);

// Mailto button listener (added after letter is generated)
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'mailtoBtn') {
        sendViaEmail();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Share Modal Functions
const shareBtn = document.getElementById('shareBtn');
const modal = document.getElementById('shareModal');
const closeBtn = document.getElementsByClassName('close')[0];

if (shareBtn) {
    shareBtn.onclick = function() {
        modal.style.display = 'block';
    }
}

if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function shareViaEmail() {
    const subject = encodeURIComponent('URGENT: Stop AI Funding at Amity Schools');
    const body = encodeURIComponent(`I just learned that Amity Regional High School is trying to fund AI grading tools that raise serious ethical, environmental, and educational concerns.

Students are already getting incorrect grades from AI. OpenAI (the company behind these tools) is a major ICE contractor. The environmental impact is massive—equivalent to entire nations' energy consumption.

We need to act NOW before the Board votes.

Learn more and take action: https://keepamityhuman.org

Please email the Board at boardofed@amityregion5.org and call Dr. Byars at 203-397-4830 ext. 4824.

#KeepAmityHuman`);
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    modal.style.display = 'none';
}

function shareViaSMS() {
    const message = encodeURIComponent(`URGENT: Amity is trying to fund AI grading tools. Students getting wrong grades. OpenAI contracts with ICE. Massive environmental impact. ACT NOW: https://keepamityhuman.org Call Dr. Byars: 203-397-4830 ext 4824 #KeepAmityHuman`);
    
    window.location.href = `sms:?&body=${message}`;
    modal.style.display = 'none';
}

function copyShareLink() {
    const shareText = `URGENT: Amity is trying to fund AI grading tools. Students getting wrong grades. OpenAI contracts with ICE. Massive environmental impact. Learn more and take action: https://keepamityhuman.org #KeepAmityHuman`;
    
    navigator.clipboard.writeText(shareText).then(() => {
        alert('Share message copied to clipboard! Paste it anywhere to spread the word.');
        modal.style.display = 'none';
    }).catch(err => {
        alert('Failed to copy. Please copy this manually:\n\n' + shareText);
    });
}

// Countdown Timer
// SET THE MEETING DATE HERE - format: 'YYYY-MM-DDTHH:MM:SS'
// Use a string format 'YYYY-MM-DDTHH:mm:ss' to avoid the zero-based month confusion
const meetingDate = new Date('2026-02-23T19:00:00').getTime(); 

function updateCountdown() {
    const now = new Date().getTime();
    const distance = meetingDate - now;
    
    // Select the display elements
    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');
    const timerContainer = document.getElementById('countdown');

    if (distance < 0) {
        if (timerContainer) {
            timerContainer.innerHTML = '<div class="countdown-label" style="color: #e63946; font-size: 1.3rem; font-weight: bold;">🚨 THE MEETING IS IN PROGRESS OR HAS PASSED</div>';
        }
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Only update if the elements actually exist in the HTML
    if (dEl) dEl.textContent = days;
    if (hEl) hEl.textContent = hours;
    if (mEl) mEl.textContent = minutes;
    if (sEl) sEl.textContent = seconds;
}

// Start immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ========================================
// VOTING TABLE — EXPANDABLE ROWS
// ========================================

const votes = [
    { desc: "Enter executive session (invite Dr. Byars)", result: "PASSED", resultClass: "vote-yes", date: "Feb 2, 2026",
      individual: { bradley: "favor", cloudingram: "favor", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "favor", schuster: "favor", young: "favor" } },
    { desc: "Approve ARHS LMC Design Plans", result: "PASSED", resultClass: "vote-yes", date: "Feb 2, 2026",
      individual: { bradley: "favor", cloudingram: "favor", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "favor", schuster: "favor", young: "favor" } },
    { desc: "Approve January 12, 2026 minutes", result: "PASSED", resultClass: "vote-yes", date: "Feb 2, 2026",
      individual: { bradley: "favor", cloudingram: "favor", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "favor", schuster: "favor", young: "favor" } },
    { desc: "Approve Policy 6111 School Calendar", result: "PASSED", resultClass: "vote-yes", date: "Jan 12, 2026",
      individual: { bradley: "favor", cloudingram: "absent", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Budget transfer for CNC Maker Fab router", result: "PASSED", resultClass: "vote-yes", date: "Jan 12, 2026",
      individual: { bradley: "favor", cloudingram: "absent", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Budget transfer for special ed transportation services", result: "PASSED", resultClass: "vote-yes", date: "Jan 12, 2026",
      individual: { bradley: "favor", cloudingram: "absent", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Budget transfer for homebound services", result: "PASSED", resultClass: "vote-yes", date: "Jan 12, 2026",
      individual: { bradley: "favor", cloudingram: "absent", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Reduce March Allocation payment by $898,605", result: "PASSED", resultClass: "vote-yes", date: "Jan 12, 2026",
      individual: { bradley: "favor", cloudingram: "absent", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Accept Annual Financial Statements (June 30, 2025)", result: "PASSED", resultClass: "vote-yes", date: "Jan 12, 2026",
      individual: { bradley: "favor", cloudingram: "absent", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Approve December 22, 2025 minutes", result: "PASSED", resultClass: "vote-yes", date: "Jan 12, 2026",
      individual: { bradley: "favor", cloudingram: "absent", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "favor", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Approve December 08, 2025 minutes", result: "PASSED", resultClass: "vote-yes", date: "Dec 22, 2025",
      individual: { bradley: "favor", cloudingram: "absent", davis: "favor", jacquet: "favor", karunakaran: "favor", lombardi: "absent", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Approve Policy 6142.101 (School Wellness Policy)", result: "FAILED", resultClass: "vote-no", date: "Dec 8, 2025",
      individual: { bradley: "against", cloudingram: "absent", davis: "absent", jacquet: "favor", karunakaran: "favor", lombardi: "absent", mcdonough: "against", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Budget transfer for administrative assistant coverage", result: "PASSED", resultClass: "vote-yes", date: "Dec 8, 2025",
      individual: { bradley: "favor", cloudingram: "absent", davis: "absent", jacquet: "favor", karunakaran: "favor", lombardi: "absent", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Budget transfer for increased transportation costs", result: "PASSED", resultClass: "vote-yes", date: "Dec 8, 2025",
      individual: { bradley: "favor", cloudingram: "absent", davis: "absent", jacquet: "favor", karunakaran: "favor", lombardi: "absent", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Budget transfer for special ed services (vacancies/leaves)", result: "PASSED", resultClass: "vote-yes", date: "Dec 8, 2025",
      individual: { bradley: "favor", cloudingram: "absent", davis: "absent", jacquet: "favor", karunakaran: "favor", lombardi: "absent", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Xerox contract ($12,324/month through 2030)", result: "PASSED", resultClass: "vote-yes", date: "Dec 8, 2025",
      individual: { bradley: "favor", cloudingram: "absent", davis: "absent", jacquet: "favor", karunakaran: "favor", lombardi: "absent", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Fire pump replacement contract ($148,250)", result: "PASSED", resultClass: "vote-yes", date: "Dec 8, 2025",
      individual: { bradley: "favor", cloudingram: "absent", davis: "absent", jacquet: "favor", karunakaran: "favor", lombardi: "absent", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Mercury Electric contract for Brady Center ($45,861)", result: "PASSED", resultClass: "vote-yes", date: "Dec 8, 2025",
      individual: { bradley: "favor", cloudingram: "absent", davis: "absent", jacquet: "favor", karunakaran: "favor", lombardi: "absent", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
    { desc: "Silver Petrucelli contract for media center design ($34K)", result: "PASSED", resultClass: "vote-yes", date: "Dec 8, 2025",
      individual: { bradley: "favor", cloudingram: "absent", davis: "absent", jacquet: "favor", karunakaran: "favor", lombardi: "absent", mcdonough: "favor", oladele: "favor", rabuse: "favor", reed: "favor", schlank: "absent", schuster: "favor", young: "absent" } },
];

const repMeta = {
    bradley:      { name: "Cathy Bradley",      photo: null,                          initials: "CB" },
    cloudingram:  { name: "Autumn Cloud-Ingram", photo: "photos/cloudingram.jpg" },
    davis:        { name: "Paul Davis",          photo: "photos/davis.jpg" },
    jacquet:      { name: "Jennifer Jacquet",    photo: "photos/jacquet.jpg" },
    karunakaran:  { name: "Sudhir Karunakaran",  photo: "photos/sudhir.png" },
    lombardi:     { name: "Dana Lombardi",       photo: "photos/Dana Lombardi.jpg" },
    mcdonough:    { name: "Michael McDonough",   photo: "photos/Mike McDonough.jpg" },
    oladele:      { name: "Carol Oladele",       photo: "photos/oladele.jpg" },
    rabuse:       { name: "Meghan Rabuse",       photo: "photos/rabuse.jpg" },
    reed:         { name: "Patrick Reed",        photo: "photos/reed.png" },
    schlank:      { name: "Donna Schlank",       photo: "photos/schlank.jpg" },
    schuster:     { name: "Donna Schuster",      photo: "photos/schuster.png" },
    young:        { name: "Christian Young",     photo: "photos/young.jpg" },
};

function voteLabel(v) {
    if (v === "favor")   return { cls: "ev-favor",   text: "✓ In Favor" };
    if (v === "against") return { cls: "ev-against", text: "✗ Against" };
    if (v === "abstain") return { cls: "ev-abstain", text: "~ Abstain" };
    return { cls: "ev-absent", text: "— Absent" };
}

function buildVoteTable() {
    const tbody = document.getElementById('vote-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    votes.forEach((vote, i) => {
        // Main row
        const tr = document.createElement('tr');
        tr.className = 'vote-row';
        tr.innerHTML = `
            <td>${vote.desc}</td>
            <td><span class="${vote.resultClass}">${vote.result}</span></td>
            <td>${vote.date}</td>`;
        tr.addEventListener('click', () => toggleVoteRow(i));
        tbody.appendChild(tr);

        // Expand row
        const expandTr = document.createElement('tr');
        expandTr.className = 'vote-expand';
        expandTr.id = `expand-${i}`;

        const repEntries = Object.entries(vote.individual).map(([id, v]) => {
            const meta = repMeta[id];
            const { cls, text } = voteLabel(v);
            const avatar = meta.photo
                ? `<img src="${meta.photo}" alt="${meta.name}">`
                : `<div class="initials">${meta.initials || id.slice(0,2).toUpperCase()}</div>`;
            return `<div class="expand-rep ${cls}">${avatar}${meta.name}: ${text}</div>`;
        }).join('');

        expandTr.innerHTML = `<td colspan="3"><div class="vote-expand-inner">
            <strong>Individual Votes:</strong>
            <div class="expand-grid">${repEntries}</div>
        </div></td>`;
        tbody.appendChild(expandTr);
    });
}

function toggleVoteRow(i) {
    const expandRow = document.getElementById(`expand-${i}`);
    const allRows = document.querySelectorAll('.vote-row');
    const clickedRow = allRows[i];

    const isOpen = expandRow.classList.contains('show');

    // Close all
    document.querySelectorAll('.vote-expand').forEach(r => r.classList.remove('show'));
    document.querySelectorAll('.vote-row').forEach(r => r.classList.remove('open'));

    if (!isOpen) {
        expandRow.classList.add('show');
        clickedRow.classList.add('open');
    }
}

// ========================================
// VOTING HISTORY MODAL (rep card clicks)
// ========================================

function showVotingHistory(repId) {
    const meta = repMeta[repId];
    if (!meta) return;

    const repVotes = votes.map(v => ({
        desc: v.desc,
        date: v.date,
        result: v.result,
        resultClass: v.resultClass,
        myVote: v.individual[repId] || 'absent'
    }));

    const rows = repVotes.map(v => {
        const { cls, text } = voteLabel(v.myVote);
        return `<tr>
            <td>${v.desc}</td>
            <td><span class="${cls}" style="font-weight:700;">${text}</span></td>
            <td><span class="${v.resultClass}">${v.result}</span></td>
            <td style="color:#888;font-size:0.9rem;">${v.date}</td>
        </tr>`;
    }).join('');

    const absent = repVotes.filter(v => v.myVote === 'absent').length;
    const total = repVotes.length;
    const pct = Math.round((absent / total) * 100);

    document.getElementById('modal-rep-name').textContent = meta.name;
    document.getElementById('modal-rep-party').textContent = `Missed ${absent} of ${total} votes (${pct}%)`;
    document.getElementById('modal-vote-content').innerHTML = `
        <div style="overflow-x:auto;">
        <table class="voting-table">
            <thead><tr>
                <th>Vote</th><th>Their Vote</th><th>Outcome</th><th>Date</th>
            </tr></thead>
            <tbody>${rows}</tbody>
        </table>
        </div>`;

    document.getElementById('vote-modal').style.display = 'block';
}

function closeVoteModal() {
    document.getElementById('vote-modal').style.display = 'none';
}

// Init
buildVoteTable();
