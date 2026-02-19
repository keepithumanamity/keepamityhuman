// ============================================================
// INDEX.HTML — Email builder, share modal, countdown timer
// Only runs if the email builder elements are present on the page
// ============================================================
if (document.getElementById('generateBtn')) {
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
    const meetingDate = new Date('2026-03-09T19:00:00').getTime(); 
    
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
}


// ============================================================
// TRACK YOUR REP — Voting history modal + expandable vote rows
// ============================================================
// ============================================================
// VOTING DATA — sourced from official Board meeting minutes
// ============================================================
const votes = [
    { date: "Dec 8, 2025",  label: "Officer Elections (Chair, VP, Secretary, Treasurer)",             result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Approve 11/24/25 Minutes",                                        result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Discussion: 2026-27 School Calendar",                             result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Silver Petrucelli contract — media center design ($34K)",         result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Mercury Electric contract — Brady Center lighting ($45,861)",     result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Encore Fire Protection — fire pump replacement ($148,250)",       result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Xerox contract ($12,324/month through 2030)",                     result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Budget transfer — special ed certified positions",                result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Budget transfer — increased transportation costs",                result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Budget transfer — admin assistant leaves",                        result: "PASSED" },
    { date: "Dec 8, 2025",  label: "Policy 6142.101 — School Wellness Policy",                        result: "FAILED" },
    { date: "Dec 22, 2025", label: "Approve December 8, 2025 minutes",                                result: "PASSED" },
    { date: "Jan 12, 2026", label: "Approve December 22, 2025 minutes",                               result: "PASSED" },
    { date: "Jan 12, 2026", label: "Accept Annual Financial Statements (June 30, 2025)",              result: "PASSED" },
    { date: "Jan 12, 2026", label: "Reduce March Allocation payment by $898,605",                     result: "PASSED" },
    { date: "Jan 12, 2026", label: "Budget transfer — special ed homebound services",                 result: "PASSED" },
    { date: "Jan 12, 2026", label: "Budget transfer — special ed transportation",                     result: "PASSED" },
    { date: "Jan 12, 2026", label: "Budget transfer — CNC Maker Fab router",                          result: "PASSED" },
    { date: "Jan 12, 2026", label: "Approve Policy 6111 — School Calendar",                           result: "PASSED" },
    { date: "Feb 2, 2026",  label: "Approve January 12, 2026 minutes",                                result: "PASSED" },
    { date: "Feb 2, 2026",  label: "Approve ARHS LMC Design Plans",                                   result: "PASSED" },
    { date: "Feb 2, 2026",  label: "Enter executive session (invite Dr. Byars)",                      result: "PASSED" },
];

const repData = {
    bradley:     { name: "Cathy Bradley",        party: "Republican · Orange",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Against","Not present","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Not present","In favor","In favor"] },
    cloudingram: { name: "Autumn Cloud-Ingram",  party: "Democrat · Bethany",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Not present","Not present","Not present","Not present","Not present","Not present","Not present","In favor","In favor","In favor"] },
    davis:       { name: "Paul Davis",           party: "Democrat · Orange · Chairperson",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Not present","Not present","Not present","Not present","Not present","Not present","Not present","In favor","In favor","In favor"] },
    jacquet:     { name: "Jennifer Jacquet",     party: "Democrat · Orange",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor"] },
    karunakaran: { name: "Sudhir Karunakaran",  party: "Democrat · Woodbridge",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Not present","Abstain","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor"] },
    lombardi:    { name: "Dana Lombardi",        party: "Republican · Orange · Secretary",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Against","In favor","Not present","Not present","Not present","Not present","Not present","Not present","Not present","In favor","In favor","In favor"] },
    mcdonough:   { name: "Michael McDonough",    party: "Republican · Orange",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Against","Not present","In favor","In favor","In favor","In favor","In favor","Abstain","In favor","In favor","In favor","In favor"] },
    oladele:     { name: "Carol Oladele",        party: "Democrat · Woodbridge",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Against","In favor","Not present","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor"] },
    rabuse:      { name: "Meghan Rabuse",        party: "Republican · Woodbridge · Treasurer",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Against","In favor","In favor","In favor","In favor","In favor","In favor","Against","In favor","In favor","In favor","In favor"] },
    reed:        { name: "Patrick Reed",         party: "Democrat · Woodbridge · Vice Chairperson",
        votes: ["In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor"] },
    schlank:     { name: "Donna Schlank",        party: "Republican · Bethany · Deputy Treasurer",
        votes: ["In favor","Abstain","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Against","In favor","Not present","Not present","Not present","Not present","Not present","Not present","Not present","Abstain","In favor","In favor"] },
    schuster:    { name: "Donna Schuster",       party: "Democrat · Woodbridge",
        votes: ["In favor","Abstain","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Against","Not present","Abstain","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor"] },
    young:       { name: "Christian Young",      party: "Republican · Orange",
        votes: ["In favor","Abstain","In favor","In favor","In favor","In favor","In favor","In favor","In favor","In favor","Against","In favor","Not present","Not present","Not present","Not present","Not present","Not present","Not present","In favor","In favor","In favor"] }
};

function voteClass(v) {
    if (v === "In favor")    return "vote-yes";
    if (v === "Against")     return "vote-no";
    if (v === "Abstain")     return "vote-abstain";
    if (v === "Not present") return "vote-absent";
    return "";
}

function voteLabel(v) {
    if (v === "In favor")    return "✅ In Favor";
    if (v === "Against")     return "❌ Against";
    if (v === "Abstain")     return "⚠️ Abstain";
    if (v === "Not present") return "— Absent";
    return v;
}

function showVotingHistory(repId) {
    const rep = repData[repId];
    if (!rep) return;

    document.getElementById('modal-rep-name').textContent = rep.name + " — Voting Record";
    document.getElementById('modal-rep-party').textContent = rep.party;

    let inFavor = 0, against = 0, abstain = 0, absent = 0;
    rep.votes.forEach(v => {
        if (v === "In favor")    inFavor++;
        else if (v === "Against")     against++;
        else if (v === "Abstain")     abstain++;
        else if (v === "Not present") absent++;
    });

    let html = `
        <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:1.5rem;">
            <div style="background:#d4edda; border:2px solid #28a745; border-radius:6px; padding:0.75rem 1.25rem; text-align:center; flex:1;">
                <div style="font-size:1.8rem; font-weight:900; color:#155724;">${inFavor}</div>
                <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#155724;">In Favor</div>
            </div>
            <div style="background:#f8d7da; border:2px solid #dc3545; border-radius:6px; padding:0.75rem 1.25rem; text-align:center; flex:1;">
                <div style="font-size:1.8rem; font-weight:900; color:#721c24;">${against}</div>
                <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#721c24;">Against</div>
            </div>
            <div style="background:#fff3cd; border:2px solid #ffc107; border-radius:6px; padding:0.75rem 1.25rem; text-align:center; flex:1;">
                <div style="font-size:1.8rem; font-weight:900; color:#856404;">${abstain}</div>
                <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#856404;">Abstain</div>
            </div>
            <div style="background:#e9ecef; border:2px solid #6c757d; border-radius:6px; padding:0.75rem 1.25rem; text-align:center; flex:1;">
                <div style="font-size:1.8rem; font-weight:900; color:#495057;">${absent}</div>
                <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#495057;">Absent</div>
            </div>
        </div>
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr>
                    <th style="background:#1a1a1a; color:#D4AF37; padding:0.75rem; text-align:left; font-size:0.85rem;">Vote</th>
                    <th style="background:#1a1a1a; color:#D4AF37; padding:0.75rem; text-align:left; font-size:0.85rem; white-space:nowrap;">Date</th>
                    <th style="background:#1a1a1a; color:#D4AF37; padding:0.75rem; text-align:left; font-size:0.85rem;">Cast</th>
                </tr>
            </thead>
            <tbody>`;

    votes.forEach((vote, i) => {
        const v = rep.votes[i] || "Not present";
        const rowBg = v === "Against" ? "#fff5f5" : v === "Abstain" ? "#fffdf0" : v === "Not present" ? "#f8f9fa" : "white";
        html += `
                <tr style="background:${rowBg}; border-bottom:1px solid #eee;">
                    <td style="padding:0.65rem 0.75rem; font-size:0.9rem;">${vote.label}</td>
                    <td style="padding:0.65rem 0.75rem; font-size:0.85rem; color:#666; white-space:nowrap;">${vote.date}</td>
                    <td style="padding:0.65rem 0.75rem;"><span class="${voteClass(v)}">${voteLabel(v)}</span></td>
                </tr>`;
    });

    html += `</tbody></table>`;
    document.getElementById('modal-vote-content').innerHTML = html;
    document.getElementById('vote-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVoteModal() {
    document.getElementById('vote-modal').style.display = 'none';
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVoteModal();
});

// ============================================================
// FULL VOTE DATA with per-rep breakdown for expandable rows
// ============================================================
const fullVotes = [
    {
        date: "Dec 8, 2025",
        label: "Officer Elections",
        result: "PASSED",
        note: "Chair: Davis (7) | Vice Chair: Reed (8) | Secretary: Lombardi | Treasurer: Rabuse | Deputy Treasurer: Schlank",
        special: "officers",
        repVotes: {
            bradley:     { vote: "In favor", chairVote: "Bradley",  vpVote: "Bradley"  },
            cloudingram: { vote: "In favor", chairVote: "Bradley",  vpVote: "Reed"     },
            davis:       { vote: "In favor", chairVote: "Davis",    vpVote: "Reed"     },
            jacquet:     { vote: "In favor", chairVote: "Davis",    vpVote: "Reed"     },
            karunakaran: { vote: "In favor", chairVote: "Davis",    vpVote: "Reed"     },
            lombardi:    { vote: "In favor", chairVote: "Bradley",  vpVote: "Bradley"  },
            mcdonough:   { vote: "In favor", chairVote: "Bradley",  vpVote: "Bradley"  },
            oladele:     { vote: "In favor", chairVote: "Davis",    vpVote: "Reed"     },
            rabuse:      { vote: "In favor", chairVote: "Bradley",  vpVote: "Bradley"  },
            reed:        { vote: "In favor", chairVote: "Davis",    vpVote: "Reed"     },
            schlank:     { vote: "In favor", chairVote: "Davis",    vpVote: "Reed"     },
            schuster:    { vote: "In favor", chairVote: "Davis",    vpVote: "Reed"     },
            young:       { vote: "In favor", chairVote: "Bradley",  vpVote: "Bradley"  },
        }
    },
    { date: "Dec 8, 2025",  label: "Approve 11/24/25 Minutes",                              result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"Abstain", schuster:"Abstain", young:"Abstain" } },
    { date: "Dec 8, 2025",  label: "Discussion: 2026-27 School Calendar",                   result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
    { date: "Dec 8, 2025",  label: "Silver Petrucelli contract — media center design ($34K)", result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
    { date: "Dec 8, 2025",  label: "Mercury Electric — Brady Center lighting ($45,861)",     result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
    { date: "Dec 8, 2025",  label: "Encore Fire Protection — fire pump replacement ($148,250)", result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
    { date: "Dec 8, 2025",  label: "Xerox contract ($12,324/month through 2030)",            result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
    { date: "Dec 8, 2025",  label: "Budget transfer — special ed certified positions",       result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
    { date: "Dec 8, 2025",  label: "Budget transfer — increased transportation costs",       result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
    { date: "Dec 8, 2025",  label: "Budget transfer — admin assistant leaves",               result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
    { date: "Dec 8, 2025",  label: "Policy 6142.101 — School Wellness Policy",               result: "FAILED",
        repVotes: { bradley:"Against", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"Against", mcdonough:"Against", oladele:"Against", rabuse:"Against", reed:"In favor", schlank:"Against", schuster:"Against", young:"Against" } },
    { date: "Dec 22, 2025", label: "Approve December 8, 2025 minutes",                       result: "PASSED",
        repVotes: { bradley:"Not present", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"Not present", lombardi:"In favor", mcdonough:"Not present", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"Not present", young:"In favor" } },
    { date: "Jan 12, 2026", label: "Approve December 22, 2025 minutes",                      result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"Not present", davis:"Not present", jacquet:"In favor", karunakaran:"In favor", lombardi:"Not present", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"Not present", schuster:"Abstain", young:"Not present" } },
    { date: "Jan 12, 2026", label: "Accept Annual Financial Statements (June 30, 2025)",     result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"Not present", davis:"Not present", jacquet:"In favor", karunakaran:"In favor", lombardi:"Not present", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"Not present", schuster:"In favor", young:"Not present" } },
    { date: "Jan 12, 2026", label: "Reduce March Allocation payment by $898,605",            result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"Not present", davis:"Not present", jacquet:"In favor", karunakaran:"In favor", lombardi:"Not present", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"Not present", schuster:"In favor", young:"Not present" } },
    { date: "Jan 12, 2026", label: "Budget transfer — special ed homebound services",        result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"Not present", davis:"Not present", jacquet:"In favor", karunakaran:"In favor", lombardi:"Not present", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"Not present", schuster:"In favor", young:"Not present" } },
    { date: "Jan 12, 2026", label: "Budget transfer — special ed transportation",            result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"Not present", davis:"Not present", jacquet:"In favor", karunakaran:"In favor", lombardi:"Not present", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"Not present", schuster:"In favor", young:"Not present" } },
    { date: "Jan 12, 2026", label: "Budget transfer — CNC Maker Fab router",                 result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"Not present", davis:"Not present", jacquet:"In favor", karunakaran:"In favor", lombardi:"Not present", mcdonough:"Abstain", oladele:"In favor", rabuse:"Against", reed:"In favor", schlank:"Not present", schuster:"In favor", young:"Not present" } },
    { date: "Jan 12, 2026", label: "Approve Policy 6111 — School Calendar",                  result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"Not present", davis:"Not present", jacquet:"In favor", karunakaran:"In favor", lombardi:"Not present", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"Not present", schuster:"In favor", young:"Not present" } },
    { date: "Feb 2, 2026",  label: "Approve January 12, 2026 minutes",                       result: "PASSED",
        repVotes: { bradley:"Not present", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"Abstain", schuster:"In favor", young:"In favor" } },
    { date: "Feb 2, 2026",  label: "Approve ARHS LMC Design Plans",                          result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
    { date: "Feb 2, 2026",  label: "Enter executive session (invite Dr. Byars)",             result: "PASSED",
        repVotes: { bradley:"In favor", cloudingram:"In favor", davis:"In favor", jacquet:"In favor", karunakaran:"In favor", lombardi:"In favor", mcdonough:"In favor", oladele:"In favor", rabuse:"In favor", reed:"In favor", schlank:"In favor", schuster:"In favor", young:"In favor" } },
];

const repMeta = {
    bradley:     { name: "Cathy Bradley",        photo: null,                           initials: "CB" },
    cloudingram: { name: "Autumn Cloud-Ingram",  photo: "photos/cloudingram.jpg",       initials: "AC" },
    davis:       { name: "Paul Davis",           photo: "photos/davis.jpg",             initials: "PD" },
    jacquet:     { name: "Jennifer Jacquet",     photo: "photos/jacquet.jpg",           initials: "JJ" },
    karunakaran: { name: "Sudhir Karunakaran",  photo: "photos/sudhir.png",            initials: "SK" },
    lombardi:    { name: "Dana Lombardi",        photo: "photos/Dana Lombardi.jpg",     initials: "DL" },
    mcdonough:   { name: "Michael McDonough",    photo: "photos/Mike McDonough.jpg",    initials: "MM" },
    oladele:     { name: "Carol Oladele",        photo: "photos/oladele.jpg",           initials: "CO" },
    rabuse:      { name: "Meghan Rabuse",        photo: "photos/rabuse.jpg",            initials: "MR" },
    reed:        { name: "Patrick Reed",         photo: "photos/reed.png",              initials: "PR" },
    schlank:     { name: "Donna Schlank",        photo: "photos/schlank.jpg",           initials: "DS" },
    schuster:    { name: "Donna Schuster",       photo: "photos/schuster.png",          initials: "DS" },
    young:       { name: "Christian Young",      photo: "photos/young.jpg",             initials: "CY" },
};

const repOrder = ["bradley","cloudingram","davis","jacquet","karunakaran","lombardi","mcdonough","oladele","rabuse","reed","schlank","schuster","young"];

function evClass(v) {
    if (v === "In favor")    return "ev-favor";
    if (v === "Against")     return "ev-against";
    if (v === "Abstain")     return "ev-abstain";
    return "ev-absent";
}

function evLabel(v) {
    if (v === "In favor")    return "✅ In Favor";
    if (v === "Against")     return "❌ Against";
    if (v === "Abstain")     return "⚠️ Abstain";
    return "— Absent";
}

function repPhotoHTML(id) {
    const m = repMeta[id];
    if (m.photo) return `<img src="${m.photo}" alt="${m.name}" class="expand-rep-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
<span class="initials" style="display:none;">${m.initials}</span>`;
    return `<span class="initials">${m.initials}</span>`;
}

function buildVoteTable() {
    const tbody = document.getElementById('vote-tbody');
    if (!tbody) return;
    let html = '';

    fullVotes.forEach((vote, i) => {
        const resultClass = vote.result === 'PASSED' ? 'vote-yes' : 'vote-no';

        // Count votes
        let inFavor = 0, against = 0, abstain = 0, absent = 0;
        if (vote.special === 'officers') {
            repOrder.forEach(id => { if (vote.repVotes[id]) inFavor++; });
        } else {
            repOrder.forEach(id => {
                const v = vote.repVotes[id] || 'Not present';
                if (v === 'In favor') inFavor++;
                else if (v === 'Against') against++;
                else if (v === 'Abstain') abstain++;
                else absent++;
            });
        }

        const tally = vote.special === 'officers'
            ? `<span style="font-size:0.75rem; color:#888; margin-left:0.5rem;">(unanimous)</span>`
            : `<span style="font-size:0.75rem; color:#888; margin-left:0.5rem;">${inFavor}–${against}${abstain > 0 ? ` (${abstain} abs)` : ''}${absent > 0 ? ` (${absent} absent)` : ''}</span>`;

        html += `<tr class="vote-row" id="vrow-${i}" onclick="toggleVoteExpand(${i})">
            <td>${vote.label} ${tally}</td>
            <td><span class="${resultClass}">${vote.result}</span></td>
            <td>${vote.date}</td>
        </tr>
        <tr class="vote-expand" id="vexp-${i}">
            <td colspan="3">
                <div class="vote-expand-inner">`;

        if (vote.special === 'officers') {
            // Special officer elections layout
            html += `<div style="margin-bottom:1rem;">
                <strong>Results:</strong> Chair → <strong>Paul Davis</strong> (7 votes) | Vice Chair → <strong>Patrick Reed</strong> (8 votes) | Secretary → <strong>Dana Lombardi</strong> | Treasurer → <strong>Meghan Rabuse</strong> | Deputy Treasurer → <strong>Donna Schlank</strong>
            </div>
            <div style="font-weight:700; margin-bottom:0.5rem; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;">Chair Vote (Bradley vs. Davis)</div>
            <div class="expand-grid" style="margin-bottom:1rem;">`;
            repOrder.forEach(id => {
                const rv = vote.repVotes[id];
                const chairClass = rv.chairVote === 'Davis' ? 'ev-favor' : 'ev-against';
                html += `<div class="expand-rep ${chairClass}">
                    <div style="display:flex; align-items:center; gap:0.4rem; width:100%;">
                        ${rv.chairVote === 'Davis'
                            ? `<img src="photos/davis.jpg" alt="Davis" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid #28a745;">`
                            : `<img src="photos/null" alt="" style="width:20px;height:20px;border-radius:50%;background:#ddd;border:1px solid #dc3545;" onerror="this.style.display='none'">`}
                        <span>${repMeta[id].name.split(' ').pop()} → ${rv.chairVote}</span>
                    </div>
                </div>`;
            });
            html += `</div>
            <div style="font-weight:700; margin-bottom:0.5rem; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;">Vice Chair Vote (Bradley vs. Reed)</div>
            <div class="expand-grid">`;
            repOrder.forEach(id => {
                const rv = vote.repVotes[id];
                const vpClass = rv.vpVote === 'Reed' ? 'ev-favor' : 'ev-against';
                html += `<div class="expand-rep ${vpClass}">
                    <span>${repMeta[id].name.split(' ').pop()} → ${rv.vpVote}</span>
                </div>`;
            });
            html += `</div>`;
        } else {
            // Standard vote breakdown
            html += `<div class="expand-grid">`;
            repOrder.forEach(id => {
                const v = vote.repVotes[id] || 'Not present';
                const m = repMeta[id];
                html += `<div class="expand-rep ${evClass(v)}">`;
                if (m.photo) {
                    html += `<img src="${m.photo}" alt="${m.name}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;border:2px solid currentColor;flex-shrink:0;" onerror="this.outerHTML='<span style=\'width:28px;height:28px;border-radius:50%;background:#ddd;display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:900;flex-shrink:0;\'>${m.initials}</span>'">`;
                } else {
                    html += `<span style="width:28px;height:28px;border-radius:50%;background:#555;display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:900;color:#D4AF37;flex-shrink:0;">${m.initials}</span>`;
                }
                html += `<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${m.name.split(' ').pop()} — ${evLabel(v)}</span></div>`;
            });
            html += `</div>`;
        }

        html += `</div></td></tr>`;
    });

    tbody.innerHTML = html;
}

function toggleVoteExpand(i) {
    const row = document.getElementById('vrow-' + i);
    const exp = document.getElementById('vexp-' + i);
    const isOpen = exp.classList.contains('show');
    // Close all
    document.querySelectorAll('.vote-expand').forEach(el => el.classList.remove('show'));
    document.querySelectorAll('.vote-row').forEach(el => el.classList.remove('open'));
    // Open this one if it was closed
    if (!isOpen) {
        exp.classList.add('show');
        row.classList.add('open');
    }
}

document.addEventListener('DOMContentLoaded', function() { if (document.getElementById('vote-tbody')) buildVoteTable(); });
